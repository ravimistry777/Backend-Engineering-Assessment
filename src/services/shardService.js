function getShard(customerId) {
    const lastDigit = parseInt(customerId.slice(-1));

    if (lastDigit % 2 === 0) {
        return "orders_shard_1"
    }

    return "orders_shard_2";
}

module.exports = getShard;