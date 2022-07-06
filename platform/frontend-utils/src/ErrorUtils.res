let error = %raw(`
    function(message, e, duration = 10) {
	console.error(e)

	message.error(e.message, duration)
}
    `)

// let handleFail = result => {
//   result->Meta3dCommonlib.Result.handleFail(Antd.Message.error)
// }
