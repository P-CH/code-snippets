let emoji;
let blacklist = [];
let active = false;
let emojicodes = ["128514", "128519", "128526", "128525", "128591", "128513", "128556", "128521", "128579", "128578"]; 
let emojis = [":joy:", ":innocent:", ":sunglasses:", ":heart_eyes:", ":pray:", ":grin:", ":grimacing:", ":wink:", ":upside_down:", ":slight_smile:"];
module.exports = {
    name: "emojihunt",
    description: "emojihunt",
    execute(message, args, client){
        if(args == "start" && message.author.id == "admin ID" && !active){
            message.channel.send("**Emoji hunt event started.**");
            active = true;
            loop();
            function loop() {
                let timeout = 3600000 + (new Array(0, 2400000, 7200000, 11400000, 14400000, 18000000))[Math.floor(Math.random()*6)];
                globalThis.main = setTimeout(() => {
                    blacklist = [];
                    emoji = emojis[Math.round(Math.random()*9)];
                    message.channel.send(emoji);
                    loop();
                }, timeout);
            }
        }
        else if(args == "end" && message.author.id == "admin ID" && active){
            message.channel.send("**Emoji hunt event ended.**");
            active = false;
            clearTimeout(main);
        }
        else if(args[0] == "catch" && active){
            if(args[1]?.codePointAt(0) == emojicodes[emojis.indexOf(emoji)] && blacklist.indexOf(message.author.id) == -1){
                for(let i = 0; i < 1; i++){
                    if(args[1]?.codePointAt(0) == null){
                        message.reply("Please supply an emoji.");
                        break;
                    } else {
                        message.reply(`Congrats! You caught ${emoji}!`);
                        client.channels.cache.get("log channel ID").send(`${message.author.username} ||${message.author.id}|| caught an emoji!`);
                        blacklist.push(message.author.id);
                    }
                }
            }
            else {
                message.reply("You didnt catch an emoji :/");
            }
        }
    }
}
