const { Client, GatewayIntentBits, Partials, db, EmbedBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

client.login(process.env.token).then(
    function () {
        console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
    },
    function (err) {
        console.log("[ERROR] Token'de bir hata oluştu: " + err);
        setInterval(function () {
            process.exit(0);
        }, 20000);
    }
);

client.on("ready", () => {});

client.on("presenceUpdate", async (eski, yeni) => {
      const member = client.guilds.cache.get("1212715851808243722").members.cache.get(yeni.user.id);
      const channel = client.channels.cache.get("1233413832995639357");
      const text = "/gamertags";
      const rol = "1233414319404744714";
      const yenia = yeni?.activities[0]?.state;
      const eskia = eski?.activities[0]?.state;
      if (member) {
        const targetRole = member.guild.roles.cache.get(rol);

        if (eskia?.includes(text) && !yenia?.includes(text)) {
            member.roles.remove(rol).catch(e => {});
            const color = "#ff0000";

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`${yeni.user.username} durumundan **${text}** yazısını sildiği için ${targetRole.toString()} rolünü aldım.`);

            channel.send({ embeds: [embed] });
        }

        if (yenia?.includes(text)) {
            member.roles.add(rol).catch(e => {});
            const color = "#00ff11";

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`${yeni.user.username} durumuna eklediği için ${targetRole.toString()} rolünü verdim.`);

            channel.send({ embeds: [embed] });
        }
    }
});

client.on("messageDelete", async (deletedMessage) => {
    const member = client.guilds.cache.get("1212715851808243722").members.cache.get(deletedMessage.author.id);
    const channel = client.channels.cache.get("1233413832995639357");
    const text = "/accountgen";
    const rol = "1233414319404744714";

    if (deletedMessage.content.includes(text) && !!member) {
        member.roles.remove(rol).catch(e => {});

        const color = "#ff0000";

        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`${deletedMessage.author.username} **${text}** içeren mesajını sildiğinden dolayı ${targetRole.toString()} rolünü aldım.`);

        channel.send({ embeds: [embed] });
    }
});
