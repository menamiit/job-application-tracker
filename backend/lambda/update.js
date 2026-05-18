const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'JobApplications';

exports.handler = async (event) => {
    console.log('UPDATE Lambda triggered:', JSON.stringify(event));

    try {
        const { id } = event.pathParameters;
        const { status, notes } = JSON.parse(event.body);

        if (!id) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Application ID is required' }),
            };
        }

        const updateExpression = [];
        const expressionAttributeValues = {};

        if (status) {
            updateExpression.push('#status = :status');
            expressionAttributeValues[':status'] = status;
        }

        if (notes !== undefined) {
            updateExpression.push('notes = :notes');
            expressionAttributeValues[':notes'] = notes;
        }

        if (updateExpression.length === 0) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'No fields to update' }),
            };
        }

        await dynamodb
            .update({
                TableName: TABLE_NAME,
                Key: { applicationId: id },
                UpdateExpression: 'SET ' + updateExpression.join(', '),
                ExpressionAttributeValues: expressionAttributeValues,
                ExpressionAttributeNames: { '#status': 'status' },
            })
            .promise();

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
            body: JSON.stringify({ error: 'Failed to update application' }),
        };
    }
};
