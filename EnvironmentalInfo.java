import java.util.*;
public class EnvironmentalInfo {
    List <Opcode> allCodes = new ArrayList<Opcode>();
    public EnvironmentalInfo() {
        populateCodeList();
    }

    private void populateCodeList() {
        allCodes.add(new Opcode("30", "ADDRESS", "Get address of currently executing account", 0));
        allCodes.add(new Opcode("31", "BALANCE", "Get balance of the given account", 0));
        allCodes.add(new Opcode("32", "ORIGIN", "Get execution origination address", 0));
        allCodes.add(new Opcode("33", "CALLER", "Get caller address", 0));
        allCodes.add(new Opcode("34", "CALLVALUE", "Get deposited value by the instruction/transaction responsible for this execution", 0));
        allCodes.add(new Opcode("35", "CALLDATALOAD", "Get input data of current environment", 0));
        allCodes.add(new Opcode("36", "CALLDATASIZE", "Get size of input data in current environment", 0));
        allCodes.add(new Opcode("37", "CALLDATACOPY", "Copy input data in current environment to memory", 0));
        allCodes.add(new Opcode("38", "CODESIZE", "Get size of code running in current environment", 0));
        allCodes.add(new Opcode("39", "CODECOPY", "Copy code running in current environment to memory", 0));
        allCodes.add(new Opcode("3a", "GASPRICE", "Get price of gas in current environment", 0));
        allCodes.add(new Opcode("3b", "EXTCODESIZE", "Get size of an account's code", 0));
        allCodes.add(new Opcode("3c", "EXTCODECOPY", "Copy an account's code to memory", 0));
        allCodes.add(new Opcode("3d", "RETURNDATASIZE", "Get size of output data from the previous call from the current environment", 0));
        allCodes.add(new Opcode("3e", "RETURNDATACOPY", "Copy output data from the previous call to memory", 0));

    }
}