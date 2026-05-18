const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'JobApplications';

exports.handler = async (event) => {
    console.log('DELETE Lambda triggered:', JSON.stringify(event));

    try {
        const { id } = event.pathParameters;

        if (!id) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Application ID is required' }),
            };
        }

        await dynamodb.delete({ TableName: TABLE_NAME, Key: { applicationId: id } }).promise();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to delete application' }),
        };
    }
};
