const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Todo = require('./todo');
const authToken = process.env.AUTH_TOKEN;

const userSchema = new mongoose.Schema(
	{
		name: { type: String, minlength: 5, maxlength: 25, required: true },
		g_id: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			required: true,
			validate(email) {
				if (!validator.isEmail(email)) {
					throw { message: 'Invalid email' };
				}
			},
		},

		tokens: [
			{
				token: {
					type: String,
				},
			},
		],
		avatar: {
			uploadedAt: {
				type: Date,
			},
			name: { type: String },
			link: { type: String },
			img: {
				data: Buffer,
				contentType: String,
			},
		},
	},
	{ timestamps: true }
);

//Connecting Todo with User
userSchema.virtual('todos', {
	ref: 'Todo',
	localField: '_id',
	foreignField: 'owner',
});

const User = mongoose.model('User', userSchema);
module.exports = User;