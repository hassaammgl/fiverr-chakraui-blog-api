export const helloWorld = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hello world!😁😁😁",
    });
  } catch (error) {
    console.log(error.message);
    req.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
