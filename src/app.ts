import express from "express";
import "module-alias/register";
import { bootStrap } from "./bootstrap/index";

// Create Express server

const app = express();

export default bootStrap(app);
