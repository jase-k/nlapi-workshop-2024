/**
 * @swagger
 * components:
 *   schemas:
 *     NlapiInput:
 *       type: object
 *       required:
 *         - user_input
 *       properties:
 *         user_input:
 *           type: string
 *           description: The text string of the user's query.
 *         context:
 *           type: array
 *           items:
 *             type: string
 *           description: Any context strings to pass to the NLAPI.
 *           nullable: true
 *         thread_id:
 *           type: string
 *           description: The id of the conversation thread you wish to continue.
 *           nullable: true
 *         options:
 *           type: object
 *           description: Additional options to pass to the NLAPI.
 *           nullable: true
 *       example:
 *         user_input: "What is the weather like today?"
 *         context: ["today is October 29, 2024", "User id is 12345"]
 *         thread_id: "12345"
 *         options: { "option1": "value1" }
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
 *         thread_id:
 *           type: string
 *           description: The id of the conversation thread.
 *           nullable: true
 *       example:
 *         response: "The weather today is sunny with a high of 75°F."
 *         context: ["today is October 29, 2024"]
 *         thread_id: "12345"
 */
