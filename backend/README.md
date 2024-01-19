# Proyecto en Express

Para ignorar archivos agregar este comando en el package.json

"dev": "nodemon --ignore 'nombredelarchivo.??' index.js"

para crear una base de datos

db.serialize(() => {
    // db.run("CREATE TABLE entries (id INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(100), content varchar(500), title varchat(100))");
    db.run("CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(100), content VARCHAR(500), title VARCHAR(100), fecha_creacion DATE)");

    const stmt = db.prepare("INSERT INTO entries(author, content, title, fecha_creacion) VALUES (?, ?, ?, ?)");
    for (let i = 0; i < 240; i++) {
        const start = new Date(2020, 0, 1); 
        const end = new Date();
        const fechaCreacion = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const formattedDate = fechaCreacion.toISOString().split('T')[0];
        stmt.run(
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            `${phrases[Math.floor(Math.random() * phrases.length)]}`,
            `${words[Math.floor(Math.random() * words.length)]}`,
            formattedDate
        );
    }
    stmt.finalize();
});