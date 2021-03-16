const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');

//Bot Ready
client.on("ready", () => {
  console.log('Bot is Ready!')

  client.user.setActivity(`Made by Gl1thy#0001`, {
    type: 2,
    url: 'https://www.twitch.tv/glitchybrick'
  });

});

//Nitro Gen
client.on('message', message => {
    if(message.content === `${prefix}nitro`) {
        function makecode() {
            let code = "";
            let dict =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstrvwxyz1234567890";
            for (var i = 0; i < 16; i++) {
              code = code + dict.charAt(Math.floor(Math.random() * dict.length));
            }
            return code;
          }
          var code = makecode();
          var nitrocode = `https://discord.gift/` + code

          const embed = new Discord.MessageEmbed();
          embed.setTitle('NItro Gen')
          embed.setDescription('A Unchecked Nitro Code has been send to your Dms')
          embed.setFooter('Made by Gl1thy#0001');
          embed.setTimestamp()
          embed.setColor('RANDOM')

          message.channel.send(embed)
          message.author.send(nitrocode)
    }
})

//Verify Code
client.on('message', async message => {
    if(message.content === `${prefix}verify`) {
      
          function makecode() {
            let code = "";
            let dict =
              "abcdefghjklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
              code = code + dict.charAt(Math.floor(Math.random() * dict.length));
            }
            return code;
          }
          var code = makecode();
      
          const exampleEmbed = new Discord.MessageEmbed();
          exampleEmbed.setColor("BLUE");
          exampleEmbed.setTitle("Verify Captcha:");
          exampleEmbed.setDescription(
            "Solve The Captcha To Verify That Your not a bot (You Got 20 Seconds)"
          );
          exampleEmbed.setImage(
            "https://flamingtext.com/net-fu/proxy_form.cgi?script=crafts-logo&fontname=typewriter+from+hell&text=" +
              code +
              "+&_loc=generate&imageoutput=true"
          );
      
          message.channel.send(exampleEmbed);
      
          //creates a message collector only looking for messages by the author for 25 seconds
          const collector = new Discord.MessageCollector(
            message.channel,
            m => m.author.id === message.author.id,
            { time: 25000 }
          );
      
          //this runs as soon as the author writes a message
          collector.on("collect", async message => {
            console.log(message.content); //logs the users message
            if (message.content === code) {
              message.channel.send("Analyzing Response....").then(msg => {
                setTimeout(function() {
                    msg.edit("Verification Complete");

                    let role = message.guild.roles.cache.find(r => r.name === "Members");
                    message.member.roles.add(role).catch(console.error);
                }, 2000)
              });
            } else {
              message.channel.send("Analyzing Response....").then(msg => {
                setTimeout(function() {
                  msg.edit("You Failed the Captcha The Code Was: '" + code + "'\n Please Try Again Later");
                }, 2000);
              });
            }
      
            collector.stop();
          });

          setTimeout(() => {
            message.channel.bulkDelete(4)
          }, 300000);
    }
});

client.login(token);
