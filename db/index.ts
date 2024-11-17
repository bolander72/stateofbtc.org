import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export async function mongofy() {
	try {
		await connect();
		console.log("✅ MongoDB connected.");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		throw error;
	}
}

export function withMongoDB(handler: Function) {
	return async (req: Request) => {
		await connect();
		return handler(req);
	};
}

// Usage in route.ts:
// export const GET = withMongoDB(async (req: Request) => {
//   // Your route logic here
// });
