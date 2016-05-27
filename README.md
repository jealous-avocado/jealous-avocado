# jealous-avocado
Greenfield project at HR


#babel command to compile jsx files

//IF IN ROOT DIRECTORY OF ENTIRE REPO 
babel public --out-dir public/compiled --presets=es2015,react --ignore=node_modules,compiled,lib --source-maps inline -w


// OR cd public (ENTER PUBLIC FOLDER) AND RUN FOLLOWING COMMAND: 
babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled,lib --source-maps inline -w
