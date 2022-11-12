const tsconfig = (src: string, build: string) =>
  `{
    "compilerOptions": {
      "rootDir": ${src},
      "moduleResolution": "node",
      "outDir": ${build},
      "removeComments": true,
      "noEmitOnError": true,
      "esModuleInterop": true,
      "declaration": true,
      "declarationDir": "${build}/dts",
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "alwaysStrict": true,
      "noFallthroughCasesInSwitch": true,
      "skipDefaultLibCheck": true,
      "skipLibCheck": true
    }
  }  
  `;
export default tsconfig;
