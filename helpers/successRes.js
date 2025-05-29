export default (
    res,
    httpStatus = 200,
    message = "Success",
    data = null
) => res.status(httpStatus).send({
    httpStatus: httpStatus,
    message: message,
    data: data,
});