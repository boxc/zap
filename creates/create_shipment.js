const create_shipment = (z, bundle) => {
	var fields = bundle.inputData;
	var line_items = [];
	for (var i = 0; i < fields.line_items.length; i++){
		var line_item = {
			'coo': fields.line_items[i].line_items_coo,
			'currency': fields.line_items[i].line_items_currency,
			'description': fields.line_items[i].line_items_description,
			'dg_code': fields.line_items[i].line_items_dg_code,
			'hts_code': fields.line_items[i].line_items_hts_code,
			'origin_description': fields.line_items[i].line_items_origin_description,
			'quantity': fields.line_items[i].line_items_quantity,
			'tax': fields.line_items[i].line_items_tax,
			'value': fields.line_items[i].line_items_value,
			'weight': fields.line_items[i].line_items_weight
		};
		line_items.push(line_item);
	}

	var from = null;
	if (fields.from_name && fields.from_street1)
	{
		from = {
			'name': fields.from_name,
			'street1': fields.from_street1,
			'street2': fields.from_street2,
			'city': fields.from_city,
			'province': fields.from_province,
			'postal_code': fields.from_postal_code,
			'country': fields.from_country
		};
	}


	var payload = {
	    'shipment': {
	        'comments': fields.comments,
	        'consignor': {
	        	'name': fields.consignor_name,
	        	'phone': fields.consignor_phone,
	        	'id': fields.consignor_id,
	        	'street1': fields.consignor_street1,
	        	'street2': fields.consignor_street2,
	        	'city': fields.consignor_city,
	        	'province': fields.consignor_province,
	        	'postal_code': fields.consignor_postal_code,
	        	'country': fields.consignor_country
	        },
	        'create_label': fields.create_label,
	        'entry_point': fields.entry_point,
	        'from': from,
	        'height': fields._height,
	        'length': fields._length,
	        'line_items': line_items,
	        'overpack_id': fields.overpack_id,
	        'override': fields.override,
	        'service': fields.service,
	        'signature_confirmation': fields.signature_confirmation,
	        'test': fields.test,
	        'to': {
				'company_name': fields.to_company_name,
				'name': fields.to_name,
				'phone': fields.to_phone,
				'email': fields.to_email,
				'street1': fields.to_street1,
				'street2': fields.to_street2,
				'city': fields.to_city,
				'province': fields.to_province,
				'postal_code': fields.to_postal_code,
				'country': fields.to_country
			},
	        'weight': fields.weight,
	        'width': fields._width
	    }
	};
	var request = {
		'url': 'https://api.boxc.com/v1/shipments',
		'method': 'POST',
		'headers': {
			'Authorization': 'Bearer ' + bundle.authData.access_token
		},
		'json': payload
	};
	const promise = z.request(request);
	return promise.then((response) => {
		const resp = JSON.parse(response.content);
		if('error' in resp){
			if(resp.status === "error"){
				throw new Error (resp.message);
			}
		}
		return resp.shipment;
	});
};

module.exports = {
	key: 'create_shipment',
	noun: 'Shipment',
	display: {
		label: 'Create Shipment',
		description: 'Creates a new shipment.',
		important: true
	},
	operation: {
		inputFields: [
			{
				label: 'Comments',
				key: 'comments',
				type: 'string',
				required: false,
				list: true
			},
			{
				label: 'Consignor',
				key: 'consignor',
				children: [
					{
						label: 'Name',
						key: 'consignor_name',
						type: 'string',
						required: true
					},
					{
						label: 'Phone',
						key: 'consignor_phone',
						type: 'string',
						required: true
					},
					{
						label: 'ID',
						key: 'consignor_id',
						type: 'string',
						required: false,
						helpText: 'Consignor\'s Tax ID, EIN, ABN, GSTIN, Vendor ID, etc.'
					},
					{
						label: 'Street 1',
						key: 'consignor_street1',
						type: 'string',
						required: true,
					},
					{
						label: 'Street 2',
						key: 'consignor_street2',
						type: 'string',
						required: false
					},
					{
						label: 'City',
						key: 'consignor_city',
						type: 'string',
						required: true
					},
					{
						label: 'Province',
						key: 'consignor_province',
						type: 'string',
						required: false
					},
					{
						label: 'Postal Code',
						key: 'consignor_postal_code',
						type: 'string',
						required: false
					},
					{
						label: 'Country',
						key: 'consignor_country',
						type: 'string',
						required: true,
						helpText: 'Two letter abbreviation.'
					}
				]
			},
			{
				label: 'Create Label',
				key: 'create_label',
				type: 'boolean',
				required: false
			},
			{
				label: 'Entry Point',
				key: 'entry_point',
				type: 'string',
				required: false,
				choices: {
					CANI01: 'Guangzhou, CN',
					CGKI01: 'Jakarta, ID',
					CVGD01: 'Hebron, US',
					HANI01: 'Hanoi, VN',
					HKGI01: 'Hong Kong, HK',
					LAXD01: 'Compton, US',
					LHRI01: 'London, GB',
					MCID01: 'Lenexa, US',
					MELI01: 'Melbourne, AU',
					PEKI01: 'Beijing, CN',
					PVGI01: 'Shanghai, CN',
					SZXI01: 'Shenzhen, CN',
				}
			},
			{
				label: 'Return Address',
				key: 'from',
				children: [
					{
						label: 'Name',
						key: 'from_name',
						type: 'string',
						required: false
					},
					{
						label: 'Street 1',
						key: 'from_street1',
						type: 'string',
						required: false
					},
					{
						label: 'Street 2',
						key: 'from_street2',
						type: 'string',
						required: false
					},
					{
						label: 'City',
						key: 'from_city',
						type: 'string',
						required: false
					},
					{
						label: 'Province',
						key: 'from_province',
						type: 'string',
						required: false
					},
					{
						label: 'Postal Code',
						key: 'from_postal_code',
						type: 'string',
						required: false
					},
					{
						label: 'Country',
						key: 'from_country',
						type: 'string',
						required: false,
						helpText: 'Two letter abbreviation.'
					}
				]
			},
			{
				label: 'Height',
				key: '_height',
				type: 'number',
				required: false,
				helpText: 'The height of the shipment in cm.'
			},
			{
				label: 'Length',
				key: '_length',
				type: 'number',
				required: false,
				helpText: 'The length of the shipment in cm.'
			},
			{
				label: 'Line Items',
				key: 'line_items',
				children: [
					{
						label: 'Country of Origin',
						key: 'line_items_coo',
						type: 'string',
						required: true,
						helpText: 'Two letter abbreviation.'
					},
					{
						label: 'Currency Code',
						key: 'line_items_currency',
						type: 'string',
						required: true,
						default: 'USD',
						helpText: 'The 3-letter currency code.'
					},
					{
						label: 'Description',
						key: 'line_items_description',
						type: 'string',
						required: true,
						helpText: 'Max length: 64'
					},
					{
						label: 'DG Code',
						key: 'line_items_dg_code',
						type: 'string',
						required: false,
						helpText: ' A code that identifies dangerous goods. Required if shipping lithium batteries, ORM-D, or other dangerous goods.'
					},
					{
						label: 'HTS Code',
						key: 'line_items_hts_code',
						type: 'string',
						required: false,
						helpText: 'The Harmonized Tariff System classification number for Customs clearance.'
					},
					{
						label: 'Origin Description',
						key: 'line_items_origin_description',
						type: 'string',
						required: false,
						helpText: 'A concise description of the line item in the entry point country\'s language. Max length: 64'
					},
					{
						label: 'Quantity',
						key: 'line_items_quantity',
						type: 'integer',
						required: true,
						helpText: 'The number of units in this line item. Max: 999'
					},
					{
						label: 'Tax',
						key: 'line_items_tax',
						type: 'number',
						required: false,
						helpText: 'If left blank, will default to 0'
					},
					{
						label: 'Value',
						key: 'line_items_value',
						type: 'number',
						required: true,
						helpText: 'The total value of this line item'
					},
					{
						label: 'Weight',
						key: 'line_items_weight',
						type: 'number',
						required: true,
						helpText: 'The weight for a single unit of this line item in KG'
					}
				]
			},
			{
				label: 'Overpack Id',
				key: 'overpack_id',
				type: 'integer',
				required: false,
				helpText: 'The overpack this shipment is inside of.'
			},
			{
				label: 'Override',
				key: 'override',
				type: 'boolean',
				required: false,
				helpText: 'Whether or not to override the address verification for this shipment.'
			},
			{
				label: 'Service',
				key: 'service',
				type: 'string',
				required: false,
				choices: [
					'BoxC Post',
					'BoxC Parcel',
					'BoxC Plus',
					'BoxC Priority'
				],
				helpText: 'The type of shipping service you want to use for this shipment.'
			},
			{
				label: 'Signature Confirmation',
				key: 'signature_confirmation',
				type: 'boolean',
				required: false,
				helpText: ' Request signature confirmation from the recipient upon delivery. Default is false. Not available for all services or routes. An additional fee may apply.'
			},
			{
				label: 'Delivery Address',
				key: 'to',
				children: [
					{
						label: 'Company Name',
						key: 'to_company_name',
						type: 'string',
						required: false
					},
					{
						label: 'Name',
						key: 'to_name',
						type: 'string',
						required: true
					},
					{
						label: 'Phone',
						key: 'to_phone',
						type: 'string',
						required: false
					},
					{
						label: 'Email',
						key: 'to_email',
						type: 'string',
						required: false
					},
					{
						label: 'Street 1',
						key: 'to_street1',
						type: 'string',
						required: true
					},
					{
						label: 'Street 2',
						key: 'to_street2',
						type: 'string',
						required: false
					},
					{
						label: 'City',
						key: 'to_city',
						type: 'string',
						required: true
					},
					{
						label: 'Province',
						key: 'to_province',
						type: 'string',
						required: false
					},
					{
						label: 'Postal Code',
						key: 'to_postal_code',
						type: 'string',
						required: false
					},
					{
						label: 'Country',
						key: 'to_country',
						type: 'string',
						required: true,
						helpText: 'Two letter abbreviation.'
					}
				]
			},
			{
				label: 'Weight',
				key: 'weight',
				type: 'number',
				required: true,
				helpText: 'The weight of the shipment in KG.'
			},
			{
				label: 'Width',
				key: '_width',
				type: 'number',
				required: false,
				helpText: 'The width of the shipment in cm.'
			},
			{
				label: 'Test',
				key: 'test',
				type: 'boolean',
				required: false,
				helpText: 'Whether or not this is a test shipment that will generate test labels. Make sure this is set to false when you are done testing this step.'
			}
		],
		perform: create_shipment,
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
	        created: "2015-05-04 08:10:24",
	        entry_point: "SZXI01",
	        from: {
	            name: "My Company Name",
	            street1: "113 INTL BROADWAY",
	            street2: "",
	            city: "LOS ANGELES",
	            province: "CA",
	            postal_code: "91013",
	            country: "US"
	        },
	        height: 3,
	        id: 1015,
	        labels: [],
	        length: 10,
	        overpack_id: 202,
	        override: false,
	        service: "BoxC Parcel",
	        signature_confirmation: false,
	        test: true,
	        to: {
	            company_name: "John's Company",
	            name: "John Smith",
	            phone: "555-123-456",
	            email: "john@gmail.com",
	            street1: "108 N Westgate Way",
	            street2: "Apt 7",
	            city: "Wylie",
	            province: "TX",
	            postal_code: "75098",
	            country: "US"
	        },
	        total_cost: 3.8,
	        verified: true,
	        weight: 0.4,
	        width: 5.25
	    }
	}
};