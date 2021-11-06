require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// authentication
const authenticateUser = require('./middleware/authentication');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss())

app.get('/',(req,res) => {
    res.send('<h2>Product API<h2><a href="/docs">document</a>')
})
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// router 
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/products',authenticateUser,productRouter)


// middleware 
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5010;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();