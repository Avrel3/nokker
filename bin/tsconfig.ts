const tsconfig = (src: string, build: string) =>
  `{
    "compilerOptions": {
      "target": "ES6",
      "module": "CommonJS",
      "rootDir": "./${src}",
      "moduleResolution": "node",
      "outDir": "./${build}",
      "removeComments": true,
      "noEmitOnError": true,
      "esModuleInterop": true,
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
