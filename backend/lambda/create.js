const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'JobApplications';

exports.handler = async (event) => {
    console.log('CREATE Lambda triggered:', JSON.stringify(event));

    try {
        const { company, position, jobLink, notes } = JSON.parse(event.body);

        // Validation
        if (!company || !position) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Company and position are required' }),
            };
        }

        const applicationId = require('crypto').randomUUID();
        const item = {
            applicationId,
            company,
            position,
            jobLink: jobLink || '',
            notes: notes || '',
            status: 'Applied',
            applicationDate: new Date().toISOString(),
            createdAt: Date.now(),
        };

        await dynamodb.put({ TableName: TABLE_NAME, Item: item }).promise();

        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, applicationId }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to create application' }),
        };
    }
};
