async function main() {
    // Получаем контрактную фабрику для нашего контракта
    const OptimizedContract = await ethers.getContractFactory("OptimizedContract");

    // Деплоим контракт
    const contract = await OptimizedContract.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // Пример замера газа на вызове функции addToStorage
    const gasEstimate = await contract.estimateGas.addToStorage(42);
    console.log("Gas estimate for addToStorage:", gasEstimate.toString());

    // Вызов функции и замер использования газа
    const tx = await contract.addToStorage(42);
    const receipt = await tx.wait();
    console.log("Gas used for addToStorage:", receipt.gasUsed.toString());
}

// Запуск скрипта
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
