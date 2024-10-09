interface FormValues {
  urls: string[];
}

export const validateURL = (values: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
  try {
    const { urls } = values;

    if (!urls || urls.length === 0) {
      alert("Please provide at least one URL.");
      return;
    }

    const emptyUrls = urls.filter((url) => !url.trim());
    if (emptyUrls.length > 0) {
      alert("Please ensure all provided URLs are filled out.");
      return;
    }

    if (urls.length > 10) {
      alert("You can only provide up to 10 URLs.");
      return;
    }

    const formattedData = urls.map((url, index) => ({
      url: `entry-${index + 1}`,
      value: url.split('/').pop(),
    }));

    alert(JSON.stringify(formattedData, null, 2));

  } catch (error) {
    console.error("Error validating URLs", error);
    alert("An error occurred while validating the URLs. Please try again later.");
  } finally {
    setSubmitting(false);
  }
}
