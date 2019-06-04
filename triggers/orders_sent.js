const orders_sent = (z, bundle) => {
	var request = {
		'url': 'https://api.boxc.com/v1/orders?status=Fulfilled',
		'method': 'GET',
		'headers': {
			'Authorization': 'Bearer ' + bundle.authData.access_token
		}
	};
    const promise = z.request(request);
	return promise.then((response) => {
        const resp = JSON.parse(response.content);
        return resp.orders;
    });
};

module.exports = {
	key: 'orders_sent',
	noun: 'Order',
	display: {
		label: 'Order Sent',
		description: 'Triggers when an order is sent.',
		important: true
	},
	operation: {
		perform: orders_sent,
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
            created: "2016-02-23 14:42:59",
            from: {
                name: "My Company Name",
                street1: "113 INTL BROADWAY",
                street2: "",
                city: "LOS ANGELES",
                province: "CA",
                postal_code: "91013",
                country: "US"
            },
            id: 20189,
            line_items: [
                {
                    "sku": "1001-AB-LG",
                    "quantity": 1,
                    "product_id": 119780,
                    "fulfillment_id": 419666,
                    "fulfilled": true
                }
            ],
            override: false,
            packing_slip: true,
            partial_fulfillment: true,
            products: 1,
            quantity: 1,
            service: "BoxC Parcel",
            shop: {
                id: "my-shop",
                name: "My Shop",
                order_id: 202,
                type: "BoxC"
            },
            status: "Processing",
            to: {
                company_name: "John's Company",
                name: "John Doe",
                email: "Doe.John@sample.com",
                phone: "555-123-4562",
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