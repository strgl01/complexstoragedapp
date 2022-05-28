pragma solidity >=0.4.22 <0.9.0;

contract complexstorage{
    uint[] public ids;

    function set(uint id) public {
        ids.push(id);

    }
    function get(uint index)view public returns(uint){
        return ids[index];

    }
    function getall() view public returns(uint[] memory){
        return ids;
    }
    function len() view public returns(uint){
        return ids.length;
    }
}