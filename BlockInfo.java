import java.util.*;
public class BlockInfo {
    List<Opcode> allCodes = new ArrayList<Opcode>();

    public BlockInfo() {
        populateCodeList();
    }

    private void populateCodeList() {
        allCodes.add(new Opcode("40", "BLOCKHASH", "Get the hash of one of the 256 most recent complete blocks", 0));
        allCodes.add(new Opcode("41", "COINBASE", "Get the block's benefciary address", 0));
        allCodes.add(new Opcode("42", "TIMESTAMP", "Get the block's timestamp", 0));
        allCodes.add(new Opcode("43", "NUMBER", "Get the block's nunber", 0));
        allCodes.add(new Opcode("44", "DIFFICULTY", "Get the block's difficulty", 0));
        allCodes.add(new Opcode("45", "GASLIMIT", "Get the block's limit", 0));
    }

}