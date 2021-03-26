//UPTIME
const express = require("express")
const app = express()
const port = 3000

app.get("/", (request, response) => { 
  console.log("Ping Received");
  response.sendStatus(200);
});

app.listen(port, () => console.log(`Bot app listening to ${port}!`))

const Discord = require('discord.js');
const { CommandoClient } = require("discord.js-commando");
const { MessageAttachment, Structures, MessageEmbed } = require("discord.js");
const { ownerid, prefix, token } = require('./config.json');
const path = require("path");
const mongoose = require('mongoose');
const Canvas = require('canvas');
const { registerFont } = require('canvas');

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: ownerid
});


client.registry.registerDefaultTypes()
client.registry.registerGroups([
  ["member", "Member Commands"],
  ["mod", "Mod Commands"]
])

client.registry.registerDefaultGroups()
client.registry.registerDefaultCommands({
  help: false,
  ping: true,
  prefix: false,
  commandState: false,
  unknownCommand: false
})

client.registry.registerCommandsIn(path.join(__dirname, "commands"))


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

client.on('message', async message => {
  if(message.content === `test`) {
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(
      path.join(__dirname, './rankcardback.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    ctx.strokeStyle = '#74037b';
	  ctx.strokeRect(0, 0, canvas.width, canvas.height);

    registerFont('./impact.ttf', { family: 'sans-serif' });

    ctx.fillStyle = '#ffffff'
    ctx.font = '40px sans-serif'

    let text = `${message.member.user.tag}`
    ctx.fillText(text, canvas.width / 3.05, canvas.height / 1.4)

    ctx.beginPath();
	  ctx.arc(130, 130, 90, 0, Math.PI * 2, true);
	  ctx.closePath();
	  ctx.clip();

    const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
	  ctx.drawImage(avatar, 30, 40, 180, 180)

    // Attach the image to a message and send it
    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png')

    message.channel.send(attachment)
  }
})


//Joim and Leave Command

client.on('guildMemberAdd', async (member) => {

    const ChannelID = '820414877566238793'
    const channel = member.guild.channels.cache.get(ChannelID)

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(
      path.join(__dirname, './rankcardback.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    ctx.strokeStyle = '#74037b';
	  ctx.strokeRect(0, 0, canvas.width, canvas.height);

    registerFont('./impact.ttf', { family: 'sans-serif' });

    ctx.fillStyle = '#ffffff'
    ctx.font = '40px sans-serif'

    let text = `${member.user.tag}`
    ctx.fillText(text, canvas.width / 3.05, canvas.height / 1.4)

    ctx.beginPath();
	  ctx.arc(130, 130, 90, 0, Math.PI * 2, true);
	  ctx.closePath();
	  ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
	  ctx.drawImage(avatar, 30, 40, 180, 180)

    // Attach the image to a message and send it
    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png')

    const embed = new Discord.MessageEmbed()
    embed.attachFiles(attachment)
    embed.setImage('attachment://welcome.png')
    embed.setTitle('A New Member Joined')
    embed.setColor('RANDOM')
    embed.setTimestamp()
    embed.setFooter('Made By Glitchybrick')

    channel.send(embed)
})

client.on('guildMemberAdd', (guildMember) => {
  guildMember.send('Welcome To USSR HUB Hope You Enjoy your Time!')
});


//Rocket Command

var one = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::three::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::rocket::cityscape::cityscape:\n'
var two = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::two::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::rocket::cityscape::cityscape:\n'
var three = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::one::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::rocket::cityscape::cityscape:\n'
var four = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::zero::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::rocket::cityscape::cityscape:\n'
var five = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:cityscape::cityscape::cityscape::cityscape::cityscape:\n'
var six = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::cityscape::cityscape::cityscape:\n'
var seven = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:cityscape::cityscape::cityscape::cityscape::cityscape:\n'
var eight = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n'
var nine = ':blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n'
var ten = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n'
var eleven = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:blue_square::blue_square::rocket::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n'
var twelve = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n'
var thirteen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:blue_square::blue_square::blue_square::blue_square::blue_square:\n'
var fourteen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var fifteen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var sixteen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var seventeen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var eighteen = ':milky_way::milky_way::red_circle::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var ninteen = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::red_circle::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var twenty = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::red_circle::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'
var twentyone = ':milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::rocket::milky_way::milky_way:\n:milky_way::milky_way::red_circle::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n:milky_way::milky_way::milky_way::milky_way::milky_way:\n'


const launchingembed = new Discord.MessageEmbed()
launchingembed.setTitle('[▖]Prepering to Launch')
launchingembed.setColor('RANDOM')

const launchingembed1 = new Discord.MessageEmbed()
launchingembed1.setTitle('[▘]Prepering to Launch.')
launchingembed1.setColor('RANDOM')

const launchingembed2 = new Discord.MessageEmbed()
launchingembed2.setTitle('[▝]Prepering to Launch..')
launchingembed2.setColor('RANDOM')

const launchingembed3 = new Discord.MessageEmbed()
launchingembed3.setTitle('[▗]Prepering to Launch...')
launchingembed3.setColor('RANDOM')

const launchingembe4 = new Discord.MessageEmbed()
launchingembe4.setTitle(':regional_indicator_r::regional_indicator_e::regional_indicator_a::regional_indicator_d::regional_indicator_y:')
launchingembe4.setColor('RANDOM')

const sucsess = new Discord.MessageEmbed()
sucsess.setTitle('Mission Secsess Landed on Mars!')
sucsess.setColor('RANDOM')

const rocketontheway = new Discord.MessageEmbed()
rocketontheway.setTitle('Rocket Has Launched and is on its way')
rocketontheway.setColor('RANDOM')

client.on('message', message => {
    if(message.content === `${prefix}rocket`) {
          message.channel.send(launchingembed).then(msg => {

            setTimeout(function() {
                msg.edit(launchingembed1)
            }, 500*1);

            setTimeout(function() {
                msg.edit(launchingembed2)
            }, 1000*2);

            setTimeout(function() {
                msg.edit(launchingembed3)
            }, 1000*4);

            setTimeout(function() {
                msg.edit(launchingembe4)
            }, 1000*6);

            setTimeout(function() {
                msg.edit(one)
            }, 1000*8);

            setTimeout(function() {
                msg.edit(two)
            }, 1000*10);

            setTimeout(function() {
                msg.edit(three)
            }, 1000*12);

            setTimeout(function() {
                msg.edit(four)
            }, 1000*14);

            setTimeout(function() {
                msg.edit(five)
            }, 1000*16);

            setTimeout(function() {
                msg.edit(rocketontheway)
            }, 1000*16);

            setTimeout(function() {
                msg.edit(six)
            }, 1000*18);

            setTimeout(function() {
                msg.edit(seven)
            }, 1000*20);

            setTimeout(function() {
                msg.edit(eight)
            }, 1000*22);

            setTimeout(function() {
                msg.edit(nine)
            }, 1000*24);

            setTimeout(function() {
                msg.edit(ten)
            }, 1000*26);

            setTimeout(function() {
                msg.edit(eleven)
            }, 1000*28);

            setTimeout(function() {
                msg.edit(twelve)
            }, 1000*30);

            setTimeout(function() {
                msg.edit(thirteen)
            }, 1000*32);

            setTimeout(function() {
                msg.edit(fourteen)
            }, 1000*34);

            setTimeout(function() {
                msg.edit(fifteen)
            }, 1000*36);

            setTimeout(function() {
                msg.edit(sixteen)
            }, 1000*38);

            setTimeout(function() {
                msg.edit(seventeen)
            }, 1000*40);

            setTimeout(function() {
                msg.edit(eighteen)
            }, 1000*42);

            setTimeout(function() {
                msg.edit(ninteen)
            }, 1000*44);

            setTimeout(function() {
                msg.edit(twenty)
            }, 1000*46);

            setTimeout(function() {
                msg.edit(twentyone)
            }, 1000*48);

            setTimeout(function() {
                msg.edit(sucsess)
            }, 1000*48);
        })
    }
})


client.login(token);
