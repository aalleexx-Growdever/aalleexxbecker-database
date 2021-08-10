module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createSchema("massotherapy");
    },

    down: async (queryInterface) => {
        await queryInterface.dropSchema("massotherapy");
    },
};
