// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BillModel {
    // Structure to represent a bill
    struct Bill {
        uint256 id;
        uint256 time;
        string itemName;
        uint256 amount;
        uint256 userId;
    }

    uint256 public billCount;
    // Mapping to store bill data with bill ID as the key
    mapping(uint256 => Bill) public bills;

    // Array to keep track of bill IDs
    uint256[] public billIds;

    // Event emitted when a new bill is created
    event BillCreated(uint256 id, uint256 time, string itemName, uint256 amount, uint256 userId);

    // Function to create a new bill
    function createBill(uint256 _time, string memory _itemName, uint256 _amount, uint256 _userId) public {
        uint256 billId = billIds.length; // Bill ID is the index in the array
        Bill storage newBill = bills[billId];

        newBill.id = billId;
        newBill.time = _time;
        newBill.itemName = _itemName;
        newBill.amount = _amount;
        newBill.userId = _userId;

        billIds.push(billId);

        emit BillCreated(billId, _time, _itemName, _amount, _userId);
        billCount++;
    }

    // Function to read bill details
    function readBill(uint256 _billId) public view returns (uint256, uint256, string memory, uint256, uint256) {
        require(_billId < billIds.length, "Bill does not exist");

        Bill storage bill = bills[_billId];
        return (bill.id, bill.time, bill.itemName, bill.amount, bill.userId);
    }

    // Function to get all bill IDs for a specific user
    function getAllBillIdsForUser(uint256 _userId) public view returns (uint256[] memory) {
        uint256[] memory userBillIds = new uint256[](billIds.length);
        uint256 count = 0;

        for (uint256 i = 0; i < billIds.length; i++) {
            if (bills[billIds[i]].userId == _userId) {
                userBillIds[count] = billIds[i];
                count++;
            }
        }

        // Resize the array to remove unused slots
        assembly {
            mstore(userBillIds, count)
        }

        return userBillIds;
    }

    // Function to get all bills for a specific user
    function getAllBillsForUser(uint256 _userId) public view returns (Bill[] memory) {
        uint256[] memory userBillIds = getAllBillIdsForUser(_userId);
        Bill[] memory userBills = new Bill[](userBillIds.length);

        for (uint256 i = 0; i < userBillIds.length; i++) {
            userBills[i] = bills[userBillIds[i]];
        }

        return userBills;
    }

    function getAllBills() external view returns (Bill[] memory) {
        Bill[] memory allBills = new Bill[](billCount);
        for (uint256 i = 0; i < billCount; i++) {
            allBills[i] = bills[i];
        }
        return allBills;
    }
}
