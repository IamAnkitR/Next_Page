import React, { useState, useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { HiPlus, HiX, HiTrash } from "react-icons/hi";
import { Formik, Field, Form, FieldArray, ErrorMessage, FormikHelpers } from "formik";
import {validationSchema} from './validationSchema'


interface FormValues {
  urls: string[];
}


export const CreateRequestMainComponent: React.FC = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({ urls: [""] });
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrls = window.localStorage.getItem("savedUrls");
      if (savedUrls) {
        setInitialValues({ urls: JSON.parse(savedUrls) });
      }
    }
  }, []);

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("savedUrls", JSON.stringify(values.urls));
    }
    alert("Request created successfully");
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex items-center justify-between border-b rounded-t">
        <div className="flex w-[100vw]">
          <h3 className="text-[18px] font-semibold text-gray-900 pl-[24px] pb-[24px] mt-[24px] dark:text-white">
            Create New Request
          </h3>
          <button className="text-gray-500 bg-transparent pr-[24px] ml-auto">
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Formik
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} 
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col h-full">
            <div className="p-6 w-[50vw] m-auto flex-grow overflow-auto">
              <div>
                <h4 className="text-[18px] mb-[2px] font-bold text-gray-900 dark:text-white">
                  Add videos or folders
                </h4>
                <p className="text-[12px] text-gray-900 dark:text-gray-400">
                  These videos would be cut, labeled and made available in your Recharm video library
                </p>
              </div>

              <FieldArray
                name="urls"
                render={(arrayHelpers) => (
                  <>
                    {values.urls.map((url: string, index: number) => (
                      <div key={index} className="my-4">
                        <p
                          className={`text-[14px] mt-[24px] font-medium ${
                            errors.urls &&
                            touched.urls &&
                            touched.urls[index] &&
                            errors.urls[index]
                              ? "text-[#C81E1E]" 
                              : "text-[#111827] dark:text-gray-400"
                          }`}
                        >
                          Video/Folder URL {index + 1}
                        </p>

                        <div className="relative flex items-center my-2 justify-between">
                          <Field
                            name={`urls.${index}`}
                            placeholder="e.g http://drive.google.com/some-link"
                            as={TextInput}
                            className={`flex-grow pr-10 ${
                              touched.urls?.[index] && errors.urls?.[index]
                                ? "border-[#C81E1E] focus:border-[#C81E1E] focus:ring-[#C81E1E] text-[#C81E1E]" 
                                : "border-gray-300 focus:ring-0"
                            }`}
                            onFocus={() => setFocusedInputIndex(index)}
                            onBlur={() => setFocusedInputIndex(null)}   
                          />
                          { (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="absolute right-12 text-gray-400 hover:text-red-600"
                            >
                              <HiTrash onClick={() => arrayHelpers.remove(index)} className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        <ErrorMessage name={`urls.${index}`} component="div" className="text-[#C81E1E] text-sm" />
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      color="light"
                      className="text-sm mt-[24px] font-medium bg-white border border-gray-300 focus:ring-0 focus:outline-none"
                    >
                      <span className="flex items-center">
                        <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                          <HiPlus className="h-3 w-3 text-white" />
                        </span>
                        Add URL
                      </span>
                    </Button>
                  </>
                )}
              />
            </div>
            
            <div className="p-4 bg-white border-t border-[#E5E7EB]">
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  color="primary"
                  className="text-[14px] text-white font-medium bg-purple-700 hover:bg-purple-800"
                  disabled={isSubmitting}
                >
                  <HiPlus className="h-5 w-5" />
                  <span className="ml-2">{isSubmitting ? "Submitting..." : "Create Request"}</span>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
