import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  urls: Yup.array().of(
    Yup.string().test("is-url-valid", "Enter a valid URL", (value) => {
      if (!value) return true;
      const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm;
      return urlPattern.test(value);
    })
  ),
});
