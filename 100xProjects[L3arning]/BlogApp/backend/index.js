// // Personal Blogging Platform API with Fastify and MongoDB
// // Install dependencies: npm install fastify mongoose dotenv

// require('dotenv').config();

// const fastify = require('fastify')({ logger: true });
// const mongoose = require('mongoose');
// fastify.register(require('@fastify/cors'));

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
//     await mongoose.connect(mongoURI);
//     console.log('MongoDB connected successfully');
//     console.log('Connected to:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')); // Hide password in logs
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };


// // Article Schema
// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true },
//   content: { type: String, required: true },
//   author: { type: String, required: true, trim: true },
//   tags: [{ type: String, trim: true }],
//   publishDate: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   published: { type: Boolean, default: true }
// });

// const Article = mongoose.model('Article', articleSchema);

// // Validation Schemas
// const articleBodySchema = {
//   type: 'object',
//   required: ['title', 'content', 'author'],
//   properties: {
//     title: { type: 'string', minLength: 1, maxLength: 200 },
//     content: { type: 'string', minLength: 1 },
//     author: { type: 'string', minLength: 1, maxLength: 100 },
//     tags: { type: 'array', items: { type: 'string' } },
//     published: { type: 'boolean' }
//   }
// };

// const updateArticleSchema = {
//   type: 'object',
//   properties: {
//     title: { type: 'string', minLength: 1, maxLength: 200 },
//     content: { type: 'string', minLength: 1 },
//     author: { type: 'string', minLength: 1, maxLength: 100 },
//     tags: { type: 'array', items: { type: 'string' } },
//     published: { type: 'boolean' }
//   }
// };

// // Routes

// // 1. GET /articles - Get all articles with optional filters
// fastify.get('/articles', {
//   schema: {
//     querystring: {
//       type: 'object',
//       properties: {
//         tags: { type: 'string' },
//         author: { type: 'string' },
//         startDate: { type: 'string' },
//         endDate: { type: 'string' },
//         published: { type: 'string', enum: ['true', 'false'] },
//         limit: { type: 'integer', minimum: 1, maximum: 100 },
//         skip: { type: 'integer', minimum: 0 }
//       }
//     }
//   }
// }, async (req, reply) => {
//   try {
//     const { tags, author, startDate, endDate, published, limit = 10, skip = 0 } = req.query;
    
//     const filter = {};
    
//     if (tags) {
//       filter.tags = { $in: tags.split(',').map(t => t.trim()) };
//     }
    
//     if (author) {
//       filter.author = new RegExp(author, 'i');
//     }
    
//     if (startDate || endDate) {
//       filter.publishDate = {};
//       if (startDate) filter.publishDate.$gte = new Date(startDate);
//       if (endDate) filter.publishDate.$lte = new Date(endDate);
//     }
    
//     if (published !== undefined) {
//       filter.published = published === 'true';
//     }
    
//     const articles = await Article.find(filter)
//       .sort({ publishDate: -1 })
//       .limit(parseInt(limit))
//       .skip(parseInt(skip));
    
//     const total = await Article.countDocuments(filter);
    
//     reply.send({
//       success: true,
//       data: articles,
//       pagination: {
//         total,
//         limit: parseInt(limit),
//         skip: parseInt(skip),
//         hasMore: skip + articles.length < total
//       }
//     });
//   } catch (err) {
//     reply.status(500).send({
//       success: false,
//       error: 'Failed to fetch articles',
//       message: err.message
//     });
//   }
// });

// // 2. GET /articles/:id - Get a single article by ID
// fastify.get('/articles/:id', async (req, reply) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return reply.status(400).send({
//         success: false,
//         error: 'Invalid article ID format'
//       });
//     }
    
//     const article = await Article.findById(id);
    
//     if (!article) {
//       return reply.status(404).send({
//         success: false,
//         error: 'Article not found'
//       });
//     }
    
//     reply.send({
//       success: true,
//       data: article
//     });
//   } catch (err) {
//     reply.status(500).send({
//       success: false,
//       error: 'Failed to fetch article',
//       message: err.message
//     });
//   }
// });

// // 3. POST /articles - Create a new article
// fastify.post('/articles', {
//   schema: {
//     body: articleBodySchema
//   }
// }, async (req, reply) => {
//   try {
//     const article = new Article(req.body);
//     await article.save();
    
//     reply.status(201).send({
//       success: true,
//       message: 'Article created successfully',
//       data: article
//     });
//   } catch (err) {
//     reply.status(500).send({
//       success: false,
//       error: 'Failed to create article',
//       message: err.message
//     });
//   }
// });

// // 4. PUT /articles/:id - Update an article
// fastify.put('/articles/:id', {
//   schema: {
//     body: updateArticleSchema
//   }
// }, async (req, reply) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return reply.status(400).send({
//         success: false,
//         error: 'Invalid article ID format'
//       });
//     }
    
//     const article = await Article.findByIdAndUpdate(
//       id,
//       { ...req.body, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );
    
//     if (!article) {
//       return reply.status(404).send({
//         success: false,
//         error: 'Article not found'
//       });
//     }
    
//     reply.send({
//       success: true,
//       message: 'Article updated successfully',
//       data: article
//     });
//   } catch (err) {
//     reply.status(500).send({
//       success: false,
//       error: 'Failed to update article',
//       message: err.message
//     });
//   }
// });

// // 5. DELETE /articles/:id - Delete an article
// fastify.delete('/articles/:id', async (req, reply) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return reply.status(400).send({
//         success: false,
//         error: 'Invalid article ID format'
//       });
//     }
    
//     const article = await Article.findByIdAndDelete(id);
    
//     if (!article) {
//       return reply.status(404).send({
//         success: false,
//         error: 'Article not found'
//       });
//     }
    
//     reply.send({
//       success: true,
//       message: 'Article deleted successfully',
//       data: article
//     });
//   } catch (err) {
//     reply.status(500).send({
//       success: false,
//       error: 'Failed to delete article',
//       message: err.message
//     });
//   }
// });

// // Health check endpoint
// fastify.get('/health', async (req, reply) => {
//   reply.send({
//     status: 'ok',
//     timestamp: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // Start server
// const start = async () => {
//   try {
//     await connectDB();
//     await fastify.listen({ port: 3000, host: '0.0.0.0' });
//     console.log('Server running on http://localhost:3000');
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();


 
// Personal Blogging Platform API with Express and MongoDB
// Install dependencies: npm install express mongoose dotenv cors

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    console.log('Connected to:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')); // Hide password in logs
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Article Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  publishDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
});

const Article = mongoose.model('Article', articleSchema);

// Validation middleware
const validateArticle = (req, res, next) => {
  const { title, content, author } = req.body;
  
  if (!title || title.trim().length === 0 || title.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Title is required and must be between 1 and 200 characters'
    });
  }
  
  if (!content || content.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Content is required'
    });
  }
  
  if (!author || author.trim().length === 0 || author.length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Author is required and must be between 1 and 100 characters'
    });
  }
  
  next();
};

// Routes

// 1. GET /articles - Get all articles with optional filters
app.get('/articles', async (req, res) => {
  try {
    const { tags, author, startDate, endDate, published, limit = 10, skip = 0 } = req.query;
    
    const filter = {};
    
    if (tags) {
      filter.tags = { $in: tags.split(',').map(t => t.trim()) };
    }
    
    if (author) {
      filter.author = new RegExp(author, 'i');
    }
    
    if (startDate || endDate) {
      filter.publishDate = {};
      if (startDate) filter.publishDate.$gte = new Date(startDate);
      if (endDate) filter.publishDate.$lte = new Date(endDate);
    }
    
    if (published !== undefined) {
      filter.published = published === 'true';
    }
    
    const articles = await Article.find(filter)
      .sort({ publishDate: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Article.countDocuments(filter);
    
    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + articles.length < total
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
      message: err.message
    });
  }
});

// 2. GET /articles/:id - Get a single article by ID
app.get('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID format'
      });
    }
    
    const article = await Article.findById(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      data: article
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
      message: err.message
    });
  }
});

// 3. POST /articles - Create a new article
app.post('/articles', validateArticle, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to create article',
      message: err.message
    });
  }
});

// 4. PUT /articles/:id - Update an article
app.put('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID format'
      });
    }
    
    const article = await Article.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Article updated successfully',
      data: article
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to update article',
      message: err.message
    });
  }
});

// 5. DELETE /articles/:id - Delete an article
app.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID format'
      });
    }
    
    const article = await Article.findByIdAndDelete(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Article deleted successfully',
      data: article
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete article',
      message: err.message
    });
  }
});

// Health check endpoint
app.get('/health', async (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server error:', err);
    process.exit(1);
  }
};

start();