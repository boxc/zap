const create_order = (z, bundle) => {
	var fields = bundle.inputData;
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
			'from': {
				'name': fields.from_name,
				'street1': fields.from_street1,
				'street2': fields.from_street2,
				'city': fields.from_city,
				'province': fields.from_province,
				'postal_code': fields.from_postal_code,
				'country': fields.from_country
			},
			'line_items': fields.line_items,
			'override': fields.override,
			'packing_slip': fields.packing_slip,
			'partial_fulfillment': fields.partial_fulfillment,
			'service': fields.service,
			'shop': {
				'id': fields.shop_id,
				'order_id': fields.shop_order_id
			},
			'status': fields.status,
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
				label: 'From',
				key: 'from',
				children: [
					{
						label: 'Name',
						key: 'from_name',
						type: 'string',
						required: true
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
				label: 'To',
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