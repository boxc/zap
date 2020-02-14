const create_order = (z, bundle) => {
	var fields = bundle.inputData;

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

	// Combine duplicate line items by SKU. Typically because of BOGO sales.
	var line_items = [];
	for (var i = 0; i < fields.line_items.length; i++)
	{
		let exists = false;
		for (var j = 0; j < line_items.length; j++)
		{
			if (fields.line_items[i].sku.toLowerCase() == line_items[j].sku.toLowerCase())
			{
				line_items[j].quantity += fields.line_items[i].quantity;
				exists = true;
				break;
			}
		}

		if (!exists)
		{
			line_items.push(fields.line_items[i]);
		}
	}

	var cne = null;
	if (fields.cne_name)
	{
		cne = {
			'name': fields.cne_name,
			'phone': fields.cne_phone,
			'email': fields.cne_email,
			'id': fields.cne_id,
			'street1': fields.cne_street1,
			'street2': fields.cne_street2,
			'city': fields.cne_city,
			'province': fields.cne_province,
			'postal_code': fields.cne_postal_code,
			'country': fields.cne_country
		};
	}

	var payload = {
		'order': {
			'created': fields.created,
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
			'consignee': cne,
			'exception_on_failure': fields.exception_on_failure,
			'from': from,
			'line_items': line_items,
			'override': fields.override,
			'packing_slip': fields.packing_slip,
			'partial_fulfillment': fields.partial_fulfillment,
			'service': fields.service,
			'shop': {
				'id': fields.shop_id,
				'order_id': fields.shop_order_id
			},
			'status': fields.status,
			'terms': fields.terms,
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
			}
		}
	};
	var request = {
		'url': 'https://api.boxc.com/v1/orders',
		'method': 'POST',
		'headers': {
			'Authorization': 'Bearer ' + bundle.authData.access_token
		},
		'json': payload
	};
	const promise = z.request(request);
	return promise.then((response) => {
		const resp = JSON.parse(response.content);
		if('status' in resp){
			if(resp.status === "error"){
				throw new Error (resp.message);
			}
		}
		return resp.order;
	});

};

module.exports = {
	key: 'create_order',
	noun: 'Order',
	display: {
		label: 'Create Order',
		description: 'Creates a new order.',
		important: true
	},
	operation: {
		inputFields: [
			{
				label: 'Created Date',
				key: 'created',
				type: 'datetime',
				required: false
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
				label: 'Line Items',
				key: 'line_items',
				children: [
					{
						label: 'Quantity',
						key: 'quantity',
						type: 'integer',
						required: true
					},
					{
						label: 'SKU',
						key: 'sku',
						type: 'string',
						helpText: "Duplicate SKUs will be merged into one line item with quantities added together in BoxC.",
						required: true
					},
					{
						label: 'Sold For',
						key: 'sold_for',
						type: 'number',
						required: false
					}
				]
			},
			{
				label: 'Override',
				key: 'override',
				type: 'boolean',
				required: false
			},
			{
				label: 'Exception on Failure',
				key: 'exception_on_failure',
				type: 'boolean',
				required: false,
				helpText: 'If checked the order will be created in an Exception state when there are address or routing issues.'
			},
			{
				label: 'Packing Slip',
				key: 'packing_slip',
				type: 'boolean',
				required: false
			},
			{
				label: 'Partial Fullfillment',
				key: 'partial_fulfillment',
				type: 'boolean',
				required: false
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
				label: 'Shop',
				key: 'shop',
				children: [
					{
						label: 'ID',
						key: 'shop_id',
						type: 'string',
						required: true
					},
					{
						label: 'Order ID',
						key: 'shop_order_id',
						type: 'string',
						required: false,
						helpText: 'The shop order ID if available. Max length: 32.'
					}
				]
			},
			{
				label: 'Status',
				key: 'status',
				type: 'string',
				required: false,
				choices: [
					'Holding',
					'Processing'
				]
			},
			{
				label: 'Terms',
				key: 'terms',
				type: 'string',
				required: false,
				choices: [
					'DDU',
					'DDP'
				],
				helpText: 'The shipment\'s preferred incoterms. Leave blank to let routing choose for you.'
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
				label: 'Consignee',
				key: 'cne',
				children: [
					{
						label: 'Name',
						key: 'cne_name',
						type: 'string',
						required: false,
						helpText: 'Leave all consignee fields blank to inherit the delivery address'
					},
					{
						label: 'Phone',
						key: 'cne_phone',
						type: 'string',
						required: false
					},
					{
						label: 'Email',
						key: 'cne_email',
						type: 'string',
						required: false
					},
					{
						label: 'Tax ID',
						key: 'cne_id',
						type: 'string',
						required: false
					},
					{
						label: 'Street 1',
						key: 'cne_street1',
						type: 'string',
						required: false
					},
					{
						label: 'Street 2',
						key: 'cne_street2',
						type: 'string',
						required: false
					},
					{
						label: 'City',
						key: 'cne_city',
						type: 'string',
						required: false
					},
					{
						label: 'Province',
						key: 'cne_province',
						type: 'string',
						required: false
					},
					{
						label: 'Postal Code',
						key: 'cne_postal_code',
						type: 'string',
						required: false
					},
					{
						label: 'Country',
						key: 'cne_country',
						type: 'string',
						required: false,
						helpText: 'Two letter abbreviation.'
					}
				]
			}
		],
		perform: create_order,
		sample: {
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
	            name: "John Doe",
	            phone: "555-123-4562",
	            email: "Doe.John@sample.com",
	            id: null,
	            street1: "1500 Marilla St",
	            street2: "Apt 7",
	            city: "Dallas",
	            province: "TX",
	            postal_code: "75201",
	            country: "US"
	        },
	        created: "2016-02-21 11:50:30",
	        from: {
	            name: "My Company, LLC",
	            street1: "311 SAINT NICHOLAS AVE, 2D",
	            street2: "",
	            city: "RIDGEWOOD",
	            province: "NY",
	            postal_code: "11385",
	            country: "US"
	        },
	        fulfillments: [],
	        id: 112019,
	        line_items: [
	            {
	                dg_code: "0965",
	                fulfilled: false,
	                fulfillment_id: 777,
	                hs_code: "111",
	                name: "M Pink T-Shirt",
	                product_id: 1022,
	                quantity: 1,
	                sku: "MYSKU1022",
	                sold_for: 14.54
	            },
	            {
	                dg_code: "0965",
	                fulfilled: false,
	                fulfillment_id: 777,
	                hs_code: "111",
	                name: "S White T-Shirt",
	                product_id: 1230,
	                quantity: 1,
	                sku: "OtherSKU#12",
	                sold_for: 9.99
	            }
	        ],
	        override: true,
	        packing_slip: true,
	        partial_fulfillment: false,
	        products: 2,
	        quantity: 2,
	        service: "BoxC Parcel",
	        shop: {
	            id: "my-shop",
	            name: "My Shop",
	            order_id: "CustomOrder#",
	            type: "BoxC"
	        },
	        status: "Processing",
	        terms: "DDU",
	        to: {
	            company_name: "John's Company",
	            name: "John Doe",
	            phone: "555-123-4562",
	            email: "Doe.John@sample.com",
	            street1: "1500 Marilla St",
	            street2: "Apt 7",
	            city: "Dallas",
	            province: "TX",
	            postal_code: "75201",
	            country: "US"
	        }
	    }
	}
};