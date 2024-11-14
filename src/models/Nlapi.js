/**
 * @swagger
 * components:
 *   schemas:
 *     NlapiInput:
 *       type: object
 *       required:
 *         - userInput
 *       properties:
 *         userInput:
 *           type: string
 *           description: The text string of the user's query.
 *         context:
 *           type: array
 *           items:
 *             type: string
 *           description: Any context strings to pass to the NLAPI.
 *           nullable: true
 *         threadId:
 *           type: string
 *           description: The id of the conversation thread you wish to continue.
 *           nullable: true
 *         options:
 *           type: object
 *           description: Additional options to pass to the NLAPI.
 *           nullable: true
 *       example:
 *         userInput: "What are the details of my profile?"
 *         context: ["today is October 29, 2024"]
 *         threadId: "12345"
 *         options: { "stream": "true" }
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NlapiOutput:
 *       type: object
 *       required:
 *         - response
 *       properties:
 *         response:
 *           type: string
 *           description: The response text from the NLAPI.
 *         context:
 *           type: array
 *           items:
 *             type: string
 *           description: Updated context strings from the NLAPI.
 *           nullable: true
 *         threadId:
 *           type: string
 *           description: The id of the conversation thread.
 *           nullable: true
 *       example:
 *         response: "The weather today is sunny with a high of 75°F."
 *         context: ["today is October 29, 2024"]
 *         threadId: "12345"
 */
