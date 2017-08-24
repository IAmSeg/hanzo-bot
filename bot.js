var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
 token: auth.token,
 autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.toLowerCase().indexOf('offering') != -1) {
    var message = 'Your tribute was... ';
    // roll a die for how good the offering was
    var result = Math.floor(Math.random() * 11);

    switch(result) {
      case 0:
        message += 'a dishonor to yourself and to House Shimada. You should be ashamed.';
        break;
      case 1:
        message += 'disgraceful.';
        break;
      case 2:
        message += 'made in haste. Take your time to honor a great house.';
        break;
      case 3:
        message += 'in need of practice. Step into my dojo.';
        break;
      case 4:
        message += 'satisfactory.';
        break;
      case 5:
        message += 'pleasing, but you can do better.';
        break;
      case 6:
        message += 'a gift given in good favor.';
        break;
      case 7:
        message += 'honorable. My brother Genji would be proud.';
        break;
      case 8:
        message += 'very pleasing. I shall name my next arrow after your house.';
        break;
      case 9:
        message += 'truly worthy of a warrior. You honor yourself and House Shimada.';
        break;
      case 10:
        message += 'mind blowing. You are a great warrior and teammate. It is known.';
        break;
    }

    bot.sendMessage({
      to: channelID,
      message: message
    });
  }

  if (message.toLowerCase().indexOf('apologize') != -1 || message.toLowerCase().indexOf('apology') != -1) {
    var result = Math.floor(Math.random() * 5);
    var message = '';

    switch (result) {
      case 0:
        message += 'Your sins have been forgiven.';
        break;
      case 1:
        message += 'You have wronged House Shimada. Shame shall fall upon your head.';
        break;
      case 2:
        message += 'Everyone falls. Not everyone can climb walls to get back up.';
        break;
      case 3:
        message += 'You have been enlightened. Go forth. See what the dragon sees.';
        break;
      case 4:
        message += 'No amount of flattery can repair the damage you have done.';
        break;
    }

    bot.sendMessage({
      to: channelID,
      message: message
    });
  }
});
