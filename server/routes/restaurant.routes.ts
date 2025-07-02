import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrder,
  getSingleRestaurant,
  searchRestaurant,
  updateOderStatus,
  updateRestaurant,
} from "../controller/resturant.controller";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("imageFile"), createRestaurant);

router.route("/").get(isAuthenticated, getRestaurant);

router
  .route("/:id")
  .put(isAuthenticated, upload.single("imageFile"), updateRestaurant);

router.route("/order").get(isAuthenticated, getRestaurantOrder);

router.route("/order/:orderId/status").put(isAuthenticated, updateOderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);


export default router
