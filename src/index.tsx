import "@logseq/libs";

console.log("hello world");

function main() {
  console.log("hello from main");
}

logseq.ready(main).catch(console.error);
