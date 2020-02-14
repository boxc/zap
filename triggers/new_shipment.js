const new_shipment = (z, bundle) => {
	var request = {
		'url': 'https://api.boxc.com/v1/shipments',
		'method': 'GET',
		'headers': {
			'Authorization': 'Bearer ' + bundle.authData.access_token
		}
	};
	const promise = z.request(request);
	return promise.then((response) => {
		const resp = JSON.parse(response.content);
		return resp.shipments;
	});
};

module.exports = {
	key: 'new_shipment',
	noun: 'Shipment',
	display: {
		label: 'New Shipment',
		description: 'Triggers when a new shipment is created.',
		important: true
	},
	operation: {
		perform: new_shipment,
		sample: {
			comments: [
				"This is a comment"
			],
			consignor: {
				name: "Generic Company, LLC",
				phone: "555-123-4567",
				id: null,
				street1: "1 WORLD WAY",
				street2: "",
				city: "SHENZHEN",
				province: "GUANGDONG",
				postal_code: "518000",
				country: "CN"
			},
			consignee: {
				name: "John Smith",
				phone: "555-123-4562",
				email: "john@gmail.com",
				id: null,
				street1: "108 N Westgate Way",
				street2: "Apt 7",
				city: "Wylie",
				province: "TX",
				postal_code: "75098",
				country: "US"
			},
			created: "2015-04-30 18:21:22",
			entry_point: "CANI01",
			from: {
				name: "My Company Name",
				street1: "113 INTL BROADWAY",
				street2: "",
				city: "LOS ANGELES",
				province: "CA",
				postal_code: "91013",
				country: "US"
			},
			height: 3.5,
			id: 1019,
			label: {
				cancelled: false,
				cost: 3.56,
				created: "2015-04-30 18:22:00",
				id: 898212,
				override_fee: 0,
				oversize_fee: 0,
				processed: true,
				processed_date: "2015-05-02",
				processed_weight: 0.284,
				service: "BoxC Parcel",
				tax: 0,
				tracking_number: "9261299991753900000290"
			},
			length: 10,
			overpack_id: 201921,
			override: true,
			service: "BoxC Parcel",
			signature_confirmation: false,
			terms: "DDU",
			test: false,
			to: {
				company_name: "John's Company",
				name: "John Smith",
				phone: "555-123-4562",
				email: "john@gmail.com",
				street1: "108 N Westgate Way",
				street2: "Apt 7",
				city: "Wylie",
				province: "TX",
				postal_code: "75098",
				country: "US"
			},
			total_cost: 3.56,
			verified: true,
			weight: 0.325,
			width: 5
		}
	}
};