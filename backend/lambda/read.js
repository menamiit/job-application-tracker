const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'JobApplications';

exports.handler = async (event) => {
    console.log('READ Lambda triggered');

    try {
        const result = await dynamodb.scan({ TableName: TABLE_NAME }).promise();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                success: true,
                applications: result.Items || [],
                count: (result.Items || []).length,
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to fetch applications' }),
        };
    }
};
