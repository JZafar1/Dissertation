# Static Analysis of Smart Contracts Dissertaion Project
To compile the project from the command line, navigate to the root directory and run:

`java -jar target/Implementation-1.0-SNAPSHOT.jar <arg>`

By default a list of opcodes will be produced, for alternative outputs replace `<arg>` with:

`opcodes` for a full list of opcodes

`branch` to produce the full branch structure

`simple branch` to produce a simplified branch structure

`gui` to launch the GUI and output a simplified branch structure

`update` to update the dictonary file used as part of the GUI and remove any local files which are no longer required.

Bytecode and caller address may be provided using the variables "bytecode" and "address" respectively in src/main/java/decode/decodeBytes/Decode.java.
