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

var offeringMessages = [
  'a dishonor to yourself and to House Shimada. You should be ashamed.',
  'disgraceful.',
  'made in haste. Take your time to honor a great house.',
  'in need of practice. Step into my dojo.',
  'satisfactory.',
  'pleasing, but you can do better.',
  'a gift given in good favor.',
  'honorable. My brother Genji would be proud.',
  'very pleasing. I shall name my next arrow after your house.',
  'truly worthy of a warrior. You honor yourself and House Shimada.',
  'mind blowing. You are a great warrior and teammate. It is known.'
];

var apologyMessages = [
  'Your sins have been forgiven.',
  'You have wronged House Shimada. Shame shall fall upon your head.',
  'Everyone falls. Not everyone can climb walls to get back up.',
  'You have been enlightened. Go forth. See what the dragon sees.',
  'No amount of flattery can repair the damage you have done.'
];

var helloMessages = [
  'Greetings, Warrior ',
  'Hi, ',
  'It is an honor, ',
  'The pleasure is mine, '
];

bot.on('message', function (user, userID, channelID, message, evt) {
  // checking if the user has made an offering
  if (message.toLowerCase().indexOf('offering') != -1) {
    var message = 'Your tribute was... ';
    // roll a die for how good the offering was
    var result = Math.floor(Math.random() * 11);

    bot.sendMessage({
      to: channelID,
      message: message + offeringMessages[result]
    });
  }

  // checking if the user has asked for forgiveness
  if (message.toLowerCase().indexOf('apologize') != -1 ||
      message.toLowerCase().indexOf('apology') != -1 ||
      message.toLowerCase().indexOf('forgive') != -1 ||
      message.toLowerCase().indexOf('forgiveness') != -1) {

    var result = Math.floor(Math.random() * 5);

    bot.sendMessage({
      to: channelID,
      message: apologyMessages[result]
    });
  }

  if (message.toLowerCase().indexOf('hello') != -1) {

    var result = Math.floor(Math.random() * 4);
    bot.sendMessage({
      to: channelID,
      message: helloMessages[result] + user
    });
  }
});
