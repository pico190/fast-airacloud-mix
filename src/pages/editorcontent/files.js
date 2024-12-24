import { encode, decode } from "js-base64";
import { createNotification } from "../../lib/ui/notification manager";
import { cmlangs } from "../../lib/codemirror/default langs";

/**
 * Loads the files and it saves it in sessionStorage
 */
export function loadFiles() {
    sessionStorage.setItem(
        "files",
        encode(
            JSON.stringify([
                {
                    name: "package",
                    type: "json",
                    extension: "json",
                    route: "/package.json",
                    code: '{\n  "name": "my_project",\n  "version": "1.0.0",\n  "description": "My TypeScript project",\n  "main": "src/main.ts",\n  "scripts": {\n    "start": "node src/index.js"\n  },\n  "dependencies": {},\n  "devDependencies": {},\n  "license": "MIT"\n}',
                },
                {
                    name: "src",
                    type: "folder",
                    route: "/src/",
                    content: [
                        {
                            name: "main",
                            type: "typescript",
                            extension: "ts",
                            route: "/src/main.ts",
                            code: "console.log('Hello TypeScript!');",
                        },
                        {
                            name: "index",
                            type: "javascriptreact",
                            extension: "jsx",
                            route: "/src/index.jsx",
                            code: `export default function App() {
  return (
    <h1>Mi aplicacion de React</h1>
  )
}`,
                        },
                        {
                            name: "bing",
                            type: "javascript",
                            extension: "js",
                            route: "/src/bing.js",
                            code: `alert("Abriendo bing..."); 
window.location.replace("https://google.com/")`,
                        },
                        {
                            name: "style",
                            type: "css",
                            extension: "css",
                            route: "/src/style.css",
                            code: ".a {color: red;}",
                        },
                        {
                            name: "index",
                            type: "html",
                            extension: "html",
                            route: "/src/index.html",
                            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Gracias por usar AiraCloud te quiero muxo <3</h1>
</body>
</html>`,
                        },
                    ],
                },
                {
                    name: "api",
                    type: "folder",
                    route: "/api/",
                    content: [
                        {
                            name: "index",
                            type: "php",
                            extension: "php",
                            route: "/api/index.php",
                            code: `<?php
echo "a";`,
                        },
                        {
                            name: "python",
                            type: "python",
                            extension: "py",
                            route: "/api/python.py",
                            code: ``,
                        },
                        /*{
              name: "c++",
              type: "cpp",
              extension: "cpp",
              route: "/api/c++.cpp",
              code: ``,
            },
            {
              name: "go",
              type: "go",
              extension: "go",
              route: "/api/go.go",
              code: ``,
            },
            {
              name: "go",
              type: "go",
              extension: "go",
              route: "/api/go.go",
              code: ``,
            },*/
                    ],
                },
                {
                    name: "fonts",
                    type: "folder",
                    route: "/fonts/",
                    content: [],
                },
                {
                    name: "Yo solo se que si esta carpeta funciona soy la hostia",
                    type: "folder",
                    route: "/Yo solo se que si esta carpeta funciona soy la hostia/",
                    content: [
                        {
                            name: "angular",
                            type: "angular",
                            extension: "angular",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/angular.angular",
                            code: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: '<h1>Hello, Angular!</h1>',\n})\nexport class AppComponent {}`,
                        },
                        {
                            name: "kotlin",
                            type: "kotlin",
                            extension: "kotlin",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/kotlin.kotlin",
                            code: `fun main() {
    println("Hello, World!")

    val name = "John"
    val age = 30
    println("Name: $name, Age: $age")

    val numbers = listOf(1, 2, 3, 4, 5)
    val sum = numbers.sum()
    println("Sum of numbers: $sum")

    val person = Person(name, age)
    println("Person details: $\{person.details()}")

    val rectangle = Rectangle(5.0, 10.0)
    println("Rectangle area: $\{rectangle.area()}")
}

class Person(val name: String, val age: Int) {
    fun details() = "Name: $name, Age: $age"
}

class Rectangle(val width: Double, val height: Double) {
    fun area() = width * height
}
`,
                        },
                        {
                            name: "css",
                            type: "css",
                            extension: "css",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/css.css",
                            code: `body {\n  background-color: lightblue;\n  color: darkblue;\n}`,
                        },
                        {
                            name: "cpp",
                            type: "cpp",
                            extension: "cpp",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/cpp.cpp",
                            code: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}`,
                        },
                        {
                            name: "go",
                            type: "go",
                            extension: "go",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/go.go",
                            code: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
                        },
                        {
                            name: "html",
                            type: "html",
                            extension: "html",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/html.html",
                            code: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello, World!</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>`,
                        },
                        {
                            name: "java",
                            type: "java",
                            extension: "java",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/java.java",
                            code: `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
                        },
                        {
                            name: "json",
                            type: "json",
                            extension: "json",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/json.json",
                            code: `{\n  "message": "Hello, World!"\n}`,
                        },
                        {
                            name: "liquid",
                            type: "liquid",
                            extension: "liquid",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/liquid.liquid",
                            code: `{{ "Hello, World!" }}`,
                        },
                        {
                            name: "markdown",
                            type: "markdown",
                            extension: "md",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/markdown.md",
                            code: `# Hello, World!\n\nThis is a markdown file.`,
                        },
                        {
                            name: "php",
                            type: "php",
                            extension: "php",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/php.php",
                            code: `<?php\n  echo "Hello, World!";\n?>`,
                        },
                        {
                            name: "python",
                            type: "python",
                            extension: "py",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/python.py",
                            code: `print("Hello, World!")`,
                        },
                        {
                            name: "rust",
                            type: "rust",
                            extension: "rs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/rust.rs",
                            code: `fn main() {\n    println!("Hello, World!");\n}`,
                        },
                        {
                            name: "sass",
                            type: "sass",
                            extension: "sass",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/sass.sass",
                            code: `body\n  background-color: lightblue\n  color: darkblue`,
                        },
                        {
                            name: "vue",
                            type: "vue",
                            extension: "vue",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/vue.vue",
                            code: `<template>\n  <div>Hello, World!</div>\n</template>`,
                        },
                        {
                            name: "xml",
                            type: "xml",
                            extension: "xml",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/xml.xml",
                            code: `<?xml version="1.0" encoding="UTF-8"?>\n<note>\n  <to>You</to>\n  <from>Me</from>\n  <heading>Hello</heading>\n  <body>World!</body>\n</note>`,
                        },
                        {
                            name: "yaml",
                            type: "yaml",
                            extension: "yaml",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/yaml.yaml",
                            code: `message: Hello, World!`,
                        },
                        {
                            name: "elixir",
                            type: "elixir",
                            extension: "ex",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/elixir.ex",
                            code: `defmodule HelloWorld do\n  IO.puts "Hello, World!"\nend`,
                        },
                        {
                            name: "golfScript",
                            type: "golfScript",
                            extension: "gs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/golfScript.gs",
                            code: `"Hello, World!" puts`,
                        },
                        {
                            name: "handlebars",
                            type: "handlebars",
                            extension: "hbs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/handlebars.hbs",
                            code: `<h1>Hello, {{name}}!</h1>`,
                        },
                        {
                            name: "hcl",
                            type: "hcl",
                            extension: "hcl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/hcl.hcl",
                            code: `variable "message" {\n  default = "Hello, World!"\n}`,
                        },
                        {
                            name: "j",
                            type: "j",
                            extension: "ijs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/j.ijs",
                            code: `NB. Hello, World!`,
                        },
                        {
                            name: "janet",
                            type: "janet",
                            extension: "janet",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/janet.janet",
                            code: `(println "Hello, World!")`,
                        },
                        {
                            name: "julia",
                            type: "julia",
                            extension: "jl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/julia.jl",
                            code: `println("Hello, World!")`,
                        },
                        {
                            name: "nix",
                            type: "nix",
                            extension: "nix",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/nix.nix",
                            code: `{ message = "Hello, World!"; }`,
                        },
                        {
                            name: "r",
                            type: "r",
                            extension: "r",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/r.r",
                            code: `cat("Hello, World!\n")`,
                        },
                        {
                            name: "sparql",
                            type: "sparql",
                            extension: "rq",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/sparql.rq",
                            code: `SELECT ?message WHERE { ?message <http://example.org/message> "Hello, World!" }`,
                        },
                        {
                            name: "svelte",
                            type: "svelte",
                            extension: "svelte",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/svelte.svelte",
                            code: `<script>\n  let message = "Hello, World!";\n</script>\n\n<h1>{message}</h1>`,
                        },
                        {
                            name: "brainfuck",
                            type: "brainfuck",
                            extension: "bf",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/brainfuck.bf",
                            code: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
                        },
                        {
                            name: "factor",
                            type: "factor",
                            extension: "factor",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/factor.factor",
                            code: `"Hello, World!" print`,
                        },
                        {
                            name: "fcl",
                            type: "fcl",
                            extension: "fcl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/fcl.fcl",
                            code: `rule "example" when condition then action end`,
                        },
                        {
                            name: "forth",
                            type: "forth",
                            extension: "forth",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/forth.forth",
                            code: `: greet  ." Hello, World!" ;`,
                        },
                        {
                            name: "fortran",
                            type: "fortran",
                            extension: "f",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/fortran.f",
                            code: `PROGRAM HELLO\nPRINT *, 'Hello, World!'\nEND PROGRAM HELLO`,
                        },
                        {
                            name: "gas",
                            type: "gas",
                            extension: "s",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/gas.s",
                            code: `.section .data\nmsg: .asciz "Hello, World!"\n.section .text\n.global _start\n_start:\nmov $msg, %rdi\ncall printf\nmov $0, %rdi\ncall exit`,
                        },
                        {
                            name: "gherkin",
                            type: "gherkin",
                            extension: "feature",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/gherkin.feature",
                            code: `Feature: Hello World\nScenario: Print hello world\nGiven the application is running\nWhen I send a hello request\nThen I should see "Hello, World!"`,
                        },
                        {
                            name: "groovy",
                            type: "groovy",
                            extension: "groovy",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/groovy.groovy",
                            code: `println 'Hello, World!'`,
                        },
                        {
                            name: "haskell",
                            type: "haskell",
                            extension: "hs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/haskell.hs",
                            code: `main = putStrLn "Hello, World!"`,
                        },
                        {
                            name: "haxe",
                            type: "haxe",
                            extension: "hx",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/haxe.hx",
                            code: `class Main { static function main() { trace("Hello, World!"); } }`,
                        },
                        {
                            name: "idl",
                            type: "idl",
                            extension: "idl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/idl.idl",
                            code: `module HelloWorld { interface Greeter { void greet(); }; };`,
                        },
                        {
                            name: "jinja2",
                            type: "jinja2",
                            extension: "j2",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/jinja2.j2",
                            code: `Hello, {{ name }}!`,
                        },
                        {
                            name: "liveScript",
                            type: "liveScript",
                            extension: "ls",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/liveScript.ls",
                            code: `console.log 'Hello, World!'`,
                        },
                        {
                            name: "mathematica",
                            type: "mathematica",
                            extension: "nb",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/mathematica.nb",
                            code: `Print["Hello, World!"]`,
                        },
                        {
                            name: "mbox",
                            type: "mbox",
                            extension: "mbox",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/mbox.mbox",
                            code: `From - Thu Jan 01 00:00:00 1970\nFrom: sender@example.com\nDate: Thu Jan 01 00:00:00 1970\nSubject: Example message\nHello, World!`,
                        },
                        {
                            name: "mirc",
                            type: "mirc",
                            extension: "mrc",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/mirc.mrc",
                            code: `on *:START: { echo -s Hello, World! }`,
                        },
                        {
                            name: "modelica",
                            type: "modelica",
                            extension: "mo",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/modelica.mo",
                            code: `model Hello\n  annotation (experiment(StartTime=0, StopTime=10, Tolerance=1e-06, Interval=1))\n  parameter Real world = 1.0 "Hello, World!";\nend Hello;`,
                        },
                        {
                            name: "mscgen",
                            type: "mscgen",
                            extension: "mscgen",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/mscgen.mscgen",
                            code: `msc {\n  a [label="Hello"], b [label="World"];\n  a=>b [label="says"];}\n`,
                        },
                        {
                            name: "mumps",
                            type: "mumps",
                            extension: "m",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/mumps.m",
                            code: `WRITE "Hello, World!"\n`,
                        },
                        {
                            name: "nginx",
                            type: "nginx",
                            extension: "nginxconf",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/nginx.nginxconf",
                            code: `server {\n  listen 80;\n  server_name localhost;\n  location / {\n    return 200 "Hello, World!";\n  }\n}\n`,
                        },
                        {
                            name: "nsis",
                            type: "nsis",
                            extension: "nsi",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/nsis.nsi",
                            code: `OutFile "hello.exe"\nSection\n  MessageBox MB_OK "Hello, World!"\nSectionEnd\n`,
                        },
                        {
                            name: "ntriples",
                            type: "ntriples",
                            extension: "nt",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/ntriples.nt",
                            code: `<http://example.org/#hello> <http://example.org/#says> "Hello, World!" .\n`,
                        },
                        {
                            name: "octave",
                            type: "octave",
                            extension: "m",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/octave.m",
                            code: `disp("Hello, World!");\n`,
                        },
                        {
                            name: "oz",
                            type: "oz",
                            extension: "oz",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/oz.oz",
                            code: `functor Hello import thread\n   define hello()     {Browse "Hello, World!"}\n   end\nend\n`,
                        },
                        {
                            name: "pascal",
                            type: "pascal",
                            extension: "pas",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/pascal.pas",
                            code: `program Hello;\nbegin\n  WriteLn('Hello, World!');\nend.\n`,
                        },
                        {
                            name: "pegjs",
                            type: "pegjs",
                            extension: "pegjs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/pegjs.pegjs",
                            code: `{ var parse = require("./grammar.js").parse;\n  console.log(parse("Hello, World!"));\n}\n`,
                        },
                        {
                            name: "perl",
                            type: "perl",
                            extension: "pl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/perl.pl",
                            code: `#!/usr/bin/perl\nprint "Hello, World!\n";\n`,
                        },
                        {
                            name: "pig",
                            type: "pig",
                            extension: "pig",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/pig.pig",
                            code: `grunt> cat data.txt\nHello, World!\n`,
                        },
                        {
                            name: "powerShell",
                            type: "powershell",
                            extension: "ps1",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/powerShell.ps1",
                            code: `Write-Output "Hello, World!"\n`,
                        },
                        {
                            name: "properties",
                            type: "properties",
                            extension: "properties",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/properties.properties",
                            code: `hello.world=Hello, World!\n`,
                        },
                        {
                            name: "protobuf",
                            type: "protobuf",
                            extension: "proto",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/protobuf.proto",
                            code: `syntax = "proto3";\n\nmessage Hello {\n  string greeting = 1;\n}\n`,
                        },
                        {
                            name: "pug",
                            type: "pug",
                            extension: "pug",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/pug.pug",
                            code: `doctype html\nhtml\n  head\n    title Hello, World!\n  body\n    h1 Hello, World!\n`,
                        },
                        {
                            name: "puppet",
                            type: "puppet",
                            extension: "pp",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/puppet.pp",
                            code: `notify { 'Hello, World!': }`,
                        },
                        {
                            name: "q",
                            type: "q",
                            extension: "q",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/q.q",
                            code: `"Hello, World!"\n`,
                        },
                        {
                            name: "ruby",
                            type: "ruby",
                            extension: "rb",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/ruby.rb",
                            code: `puts 'Hello, World!'\n`,
                        },
                        {
                            name: "sas",
                            type: "sas",
                            extension: "sas",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/sas.sas",
                            code: `data _null_;\n  file print;\n  put 'Hello, World!';\nrun;\n`,
                        },
                        {
                            name: "scheme",
                            type: "scheme",
                            extension: "scm",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/scheme.scm",
                            code: `(display "Hello, World!")\n(newline)\n`,
                        },
                        {
                            name: "shell",
                            type: "shell",
                            extension: "sh",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/shell.sh",
                            code: `echo "Hello, World!"\n`,
                        },
                        {
                            name: "sieve",
                            type: "sieve",
                            extension: "sieve",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/sieve.sieve",
                            code: `sieve "Hello, World!"`,
                        },
                        {
                            name: "smalltalk",
                            type: "smalltalk",
                            extension: "st",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/smalltalk.st",
                            code: `Transcript show: 'Hello, World!'; cr.\n`,
                        },
                        {
                            name: "solr",
                            type: "solr",
                            extension: "solr",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/solr.solr",
                            code: `<add>\n  <doc>\n    <field name="id">1</field>\n    <field name="text">Hello, World!</field>\n  </doc>\n</add>\n`,
                        },
                        {
                            name: "spreadsheet",
                            type: "spreadsheet",
                            extension: "ods",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/spreadsheet.ods",
                            code: `A1: "Hello, World!"\n`,
                        },
                        {
                            name: "stex",
                            type: "stex",
                            extension: "stex",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/stex.stex",
                            code: `Hello, World!`,
                        },
                        {
                            name: "stylus",
                            type: "stylus",
                            extension: "styl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/stylus.styl",
                            code: `body\n  color red\n  font Helvetica, sans-serif\n  h1\n    color blue\n`,
                        },
                        {
                            name: "swift",
                            type: "swift",
                            extension: "swift",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/swift.swift",
                            code: `print("Hello, World!")\n`,
                        },
                        {
                            name: "tcl",
                            type: "tcl",
                            extension: "tcl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/tcl.tcl",
                            code: `puts "Hello, World!"`,
                        },
                        {
                            name: "textile",
                            type: "textile",
                            extension: "textile",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/textile.textile",
                            code: `p. Hello, World!\n`,
                        },
                        {
                            name: "tiddlyWiki",
                            type: "tiddlywiki",
                            extension: "tid",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/tiddlyWiki.tid",
                            code: `!! Hello, World!\n`,
                        },
                        {
                            name: "tiki",
                            type: "tiki",
                            extension: "tiki",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/tiki.tiki",
                            code: `!! Hello, World!\n`,
                        },
                        {
                            name: "toml",
                            type: "toml",
                            extension: "toml",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/toml.toml",
                            code: `greeting = "Hello, World!"\n`,
                        },
                        {
                            name: "troff",
                            type: "troff",
                            extension: "tr",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/troff.tr",
                            code: `.B "Hello, World!"\n`,
                        },
                        {
                            name: "ttcnCfg",
                            type: "ttcnCfg",
                            extension: "cfg",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/ttcnCfg.cfg",
                            code: `module Hello {\n  import from World;\n  type record Msg {\n    integer id,\n    charstring text\n  };\n}\n`,
                        },
                        {
                            name: "ttcn",
                            type: "ttcn",
                            extension: "ttcn",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/ttcn.ttcn",
                            code: `module Hello {\n  import from World;\n  type record Msg {\n    integer id,\n    charstring text\n  };\n}\n`,
                        },
                        {
                            name: "turtle",
                            type: "turtle",
                            extension: "ttl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/turtle.ttl",
                            code: `@prefix ex: <http://example.org/#> .\nex:hello ex:says "Hello, World!" .\n`,
                        },
                        {
                            name: "vb",
                            type: "vb",
                            extension: "vb",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/vb.vb",
                            code: `Module HelloWorld\n  Sub Main()\n    Console.WriteLine("Hello, World!")\n  End Sub\nEnd Module\n`,
                        },
                        {
                            name: "vbscript",
                            type: "vbscript",
                            extension: "vbs",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/vbscript.vbs",
                            code: `MsgBox "Hello, World!"\n`,
                        },
                        {
                            name: "velocity",
                            type: "velocity",
                            extension: "vm",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/velocity.vm",
                            code: `#set ($msg = "Hello, World!")\n$msg\n`,
                        },
                        {
                            name: "verilog",
                            type: "verilog",
                            extension: "v",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/verilog.v",
                            code: `module hello_world;\n  initial begin\n    $display("Hello, World!");\n    $finish;\n  end\nendmodule\n`,
                        },
                        {
                            name: "vhdl",
                            type: "vhdl",
                            extension: "vhd",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/vhdl.vhd",
                            code: `entity Hello is\nend Hello;\n\narchitecture Behavioral of Hello is\nbegin\n  process\n  begin\n    report "Hello, World!";\n    wait;\n  end process;\nend Behavioral;\n`,
                        },
                        {
                            name: "wast",
                            type: "webAssembly",
                            extension: "wast",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/wast.wast",
                            code: `(module\n  (func $main (result i32)\n    i32.const 4\n  )\n)`,
                        },
                        {
                            name: "webidl",
                            type: "webidl",
                            extension: "webidl",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/webidl.webidl",
                            code: `interface Hello {\n  void greet();\n};\n`,
                        },
                        {
                            name: "xquery",
                            type: "xquery",
                            extension: "xq",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/xquery.xq",
                            code: `declare function local:hello-world() {\n  "Hello, World!"\n};\n`,
                        },
                        {
                            name: "yacas",
                            type: "yacas",
                            extension: "ys",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/yacas.ys",
                            code: `Print("Hello, World!")\n`,
                        },
                        {
                            name: "z80",
                            type: "z80",
                            extension: "z80",
                            route: "/Yo solo se que si esta carpeta funciona soy la hostia/z80.z80",
                            code: `    org 32768\n    ld hl, message\n    call 34048\n    ret\nmessage db 'Hello, World!', 13, 10, 0\n`,
                        },
                    ],
                },
                {
                    name: "tsconfig",
                    type: "json",
                    route: "/tsconfig.json",
                    extension: "json",
                    code: '{\n  "compilerOptions": {\n    "target": "es5",\n    "module": "commonjs",\n    "outDir": "dist",\n    "strict": true\n  }\n}',
                },
                {
                    name: "vercel",
                    type: "json",
                    route: "/vercel.json",
                    extension: "json",
                    code: `{
  "functions": {
    "api/git/login.php": { "runtime": "vercel-php@0.6.0" },
    "api/git/go.php": { "runtime": "vercel-php@0.6.0" },

    "api/file/edit.php": { "runtime": "vercel-php@0.6.0" },
    "api/file/get.php": { "runtime": "vercel-php@0.6.0" },
    "api/file/text.php": { "runtime": "vercel-php@0.6.0" }
  },
  "rewrites": [
    { "source": "/git/login", "destination": "/api/git/login.php" },
    { "source": "/git/go", "destination": "/api/git/go.php" },

    { "source": "/file/edit", "destination": "/api/file/edit.php" },
    { "source": "/file/get", "destination": "/api/file/get.php" },
    { "source": "/file/text", "destination": "/api/file/text.php" },

    { "source": "/(.*)", "destination": "/" }
  ]
}`,
                },
                {
                    name: "comentarios",
                    type: "jsonc",
                    route: "/comentarios.jsonc",
                    extension: "jsonc",
                    code: `{
  // Esto es json con comentarios (epok)
  "functions": {
    // aqui puedes explicar que esta propiedad es tu tia
    "api/git/login.php": { "runtime": "vercel-php@0.6.0" },
    "api/git/go.php": { "runtime": "vercel-php@0.6.0" },

    "api/file/edit.php": { "runtime": "vercel-php@0.6.0" },
    "api/file/get.php": { "runtime": "vercel-php@0.6.0" },
    "api/file/text.php": { "runtime": "vercel-php@0.6.0" }
  },
  "rewrites": [
    // amarillo
    { "source": "/git/login", "destination": "/api/git/login.php" },
    { "source": "/git/go", "destination": "/api/git/go.php" },

    { "source": "/file/edit", "destination": "/api/file/edit.php" },
    { "source": "/file/get", "destination": "/api/file/get.php" },
    { "source": "/file/text", "destination": "/api/file/text.php" },

    { "source": "/(.*)", "destination": "/" }
  ]
}`,
                },
                {
                    name: "README",
                    type: "markdown",
                    route: "/README.md",
                    extension: "md",
                    code: "# My TypeScript Project\n\nThis is a basic TypeScript project.",
                },
            ])
        )
    );
}

/**
 * It remplaces the last string of the file name. It is used for detecting de file extension or changing the file route.
 * @param {String} string - The full filename
 * @param {String} find - The string for last replacing (should be a . or a /)
 * @param {String} replace - The string for replacing the last dot (.)
 * @returns {String} - A new string with the last string replaced
 */
function replaceLast(string, find, replace) {
    var index = string.lastIndexOf(find);
    if (index !== -1) {
        return (
            string.substring(0, index) + replace + string.substring(index)
        );
    }
    return string;
}

/**
 * It creates an object for managing files (getting files, editing files, creating files, etc.)
 * All the working functions:
 * - filesOptions().getFiles();
 * - filesOptions().findFile(route);
 * - filesOptions().getFiles();
 * @returns {Object} - The object
 */
export function filesOptions() {
    var getFiles = () => {
        return JSON.parse(decode(sessionStorage.getItem("files")));
    };
    var options = {
        /**
         * It gets the last verision of the files
         */
        getFiles: getFiles,

        /**
         * It finds a file within a route (routes are like /api/index.php)
         * @param {*} route
         * @returns
         */
        findFile: (route) => {
            var position = 0;
            var routedivided = route.split("/").filter((item) => item !== "");
            var result = null;

            /**
             * A loop for searching in all the files and all the folders the file we need to get.
             * @param {Array} filesn - An array of files. It can be inside a folder or not.
             */
            function findFileContent(filesn) {
                filesn.forEach((file) => {
                    if (file.type != "folder") {
                        var splittoken = "€€€€€€€€€€€€€€€€€€€€€€€€€v";
                        var pointsplit = replaceLast(
                            routedivided[position],
                            ".",
                            splittoken
                        ).split(splittoken);
                        var name = pointsplit[0];
                        var extension = pointsplit[1]
                            ? pointsplit[1].replace(".", "")
                            : void 0;
                        if (file.name == name && file.extension == extension) {
                            result = file;
                        }
                    } else {
                        if (file.name == routedivided[position]) {
                            position++;
                            findFileContent(file.content);
                        }
                    }
                });
            }

            findFileContent(options.getFiles());
            return result;
        },

        /**
         * It edits the content of a determinated file.
         * @param {String} route - The route of the file. A route can be (/api/index.php)
         * @param {String} content - The new content
         */
        editFile: (route, content) => {
            var files = options.getFiles();

            var position = 0;
            var routedivided = route.split("/").filter((item) => item !== "");

            /**
             * A loop for searching in all the files and all the folders the file we need to edit the content.
             * @param {Array} filesn - An array of files. It can be inside a folder or not.
             */
            function findFileContent(filesn) {
                filesn.forEach((file) => {
                    if (file.type != "folder") {
                        var splittoken = "€€€€€€€€€€€€€€€€€€€€€€€€€v";
                        var pointsplit = replaceLast(
                            routedivided[position],
                            ".",
                            splittoken
                        ).split(splittoken);
                        var name = pointsplit[0];
                        var extension = pointsplit[1]
                            ? pointsplit[1].replace(".", "")
                            : void 0;
                        if (file.name == name && file.extension == extension) {
                            file.code = content;
                        }
                    } else {
                        if (file.name == routedivided[position]) {
                            position++;
                            findFileContent(file.content);
                        }
                    }
                });
            }

            findFileContent(files);
            sessionStorage.setItem("files", encode(JSON.stringify(files)));
        },

        /**
         * It edits the content of a determinated file.
         * @param {String} route - The route of the file. A route can be (/api/index.php)
         * @param {Function} setProperties - A function to execute for editing file properties
         */
        editFileInfo: (route, setProperties) => {
            var files = options.getFiles();

            var position = 0;
            var routedivided = route.split("/").filter((item) => item !== "");

            /**
             * A loop for searching in all the files and all the folders the file we need to edit the content.
             * @param {Array} filesn - An array of files. It can be inside a folder or not.
             */
            function findFileContent(filesn) {
                filesn.forEach((file) => {
                    if (file.type != "folder") {
                        var splittoken = "€€€€€€€€€€€€€€€€€€€€€€€€€v";
                        var pointsplit = replaceLast(
                            routedivided[position],
                            ".",
                            splittoken
                        ).split(splittoken);
                        var name = pointsplit[0];
                        var extension = pointsplit[1]
                            ? pointsplit[1].replace(".", "")
                            : void 0;
                        if (file.name == name && file.extension == extension) {
                            file = setProperties(file);
                        }
                    } else {
                        if (file.name == routedivided[position]) {
                            position++;
                            findFileContent(file.content);
                        }
                    }
                });
            }

            findFileContent(files);
            sessionStorage.setItem("files", encode(JSON.stringify(files)));
        },


        /**
         * Opens a file
         * @param {Function} editorLang - A function for loading the editor
         * @param {Element} file - A HTML Element of the file render.
         */
        openFile: (editorLang, file) => {
            if (!file.classList.contains("rename-file")) {
                if (file.getAttribute("aira-file-type") != "folder") {
                    var route = file.getAttribute("aira-file-route")
                    document
                        .querySelector(".editorcontainer")
                        .setAttribute(
                            "aira-file-route",
                            route
                    );
                    var filec = options.findFile(route);
                    var content = filec.code;
                    var type = file.getAttribute("aira-file-type");
                    editorLang(type, content);

                    var icon = cmlangs[type].iconname;
                    var displayFiles = [];
                    var existingFile = false;
                    window.aira.editor.displayFiles.forEach(dFile => {
                        if (dFile.key === route) {
                            existingFile = true;
                        }
                    })

                    if (!existingFile) {
                        // create a new display file
                        window.aira.editor.displayFiles.forEach(dFile => {
                            if (dFile.open) {
                                
                                displayFiles.push({
                                    icon: icon,
                                    key: route,
                                    name: filec.name + "." + filec.extension,
                                    open: true,
                                    saved: true
                                })
                            }
                            dFile.open = false;
                            displayFiles.push(dFile);
                        })
                    } else {
                        window.aira.editor.displayFiles.forEach(dFile => {
                                dFile.open = dFile.key === route;
                                displayFiles.push(dFile);
                        })
                    }
                    window.aira.editor.displayFiles = displayFiles;
                } else {
                    createNotification(
                        `<span style="color: #ff5050;">Error</style>`,
                        "Error opening this file: Its a folder!"
                    );
                    document.body.classList.remove("loading-cursor");
                }
            }
        },

        /**
         * Configures the DOM of a File Element for activating renaming file
         * @param {Element} file - The DOM of the File Element
         */
        renameFile: (file) => {
            var span = file.querySelector("span");
            if (!file.querySelector("input")) {
                span.style.display = "none";
                var input = document.createElement("input");
                file.classList.add("rename-file");
                input.value = span.innerText;
                input.focus();
                input.addEventListener("change", () => {
                    var value = input.value;
                    var unallowedChars = ["€", "\\", "/"]
                    if (!value || value.length <= 0 || value.split("").forEach(elem => {if(unallowedChars.includes(elem)) {return true}})) {
                        input.classList.add("red");
                    } else {
                        editFileInfo(file.getAttribute("aira-file-route"), (file) => {
                            var newFile = JSON.parse(JSON.stringify(file));
                            var splittoken = "€€€€€€€€€€€€€€€€€€€€€€€€€e";
                            var toSplit = replaceLast(file.route, "/", splittoken);
                            var splitted = toSplit.split();
                            splitted[1] = value; 
                            newFile.route = splitted.join("/");
                        })
                    }
                })
                input.addEventListener("blur", () => {
                    file.classList.remove("rename-file");
                    input.remove();
                    span.style.display = "";
                })
                file.appendChild(input);
            } else {
                var input = file.querySelector("input");
                file.classList.remove("rename-file");
                input.remove();
                span.style.display = "";
            }
        },
    };
    return options;
}
