import ky from 'ky'

const kyInstance = ky.create({
	parseJson: (text) =>
		JSON.parse(text, (key, value) => {
			if (key.endsWith('At') && typeof value === 'string') {
				return new Date(value)
			}

			return value
		})
})

export default kyInstance
