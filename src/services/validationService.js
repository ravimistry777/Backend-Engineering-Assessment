const allowedStatus = [
    "Pending",
    "Delivered",
    "Cancelled",
    "Processing"
];

function validateOrder(order) {
    if (!order.order_id) {
        return { valid: false, reason: "order_id missing" }
    }

    if (!order.customer_id) {
        return { valid: false, reason: "customer_id missing" }
    }

    if (!order.order_date || isNaN(Date.parse(order.order_date))) {
        return { valid: false, reason: "Invalid order_date" }
    }

    if (!order.order_amount || isNaN(Number(order.order_amount))) {
        return { valid: false, reason: "invalid order_amount" }
    }

    if (!allowedStatus.includes(order.status)) {
        return { valid: false, reason: "invalid status" }
    }

    return { valid: true };
}

module.exports = validateOrder;