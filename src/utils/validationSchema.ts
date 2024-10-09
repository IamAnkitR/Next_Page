import * as Yup from "yup";

const googleDriveUrlPattern = /^https?:\/\/drive\.google\.com\/[a-zA-Z0-9-_]+$/;

export const validationSchema = Yup.object().shape({
  urls: Yup.array()
    .of(
      Yup.string()
        .required("URL is required")
        .matches(googleDriveUrlPattern, "Enter a valid Google Drive URL")
    )
    .min(1, "Please provide at least one URL.")
    .max(10, "You can provide a maximum of 10 URLs."),
});
