module.exports = function(grunt, options) {

  // console.log('Target is: '+grunt.option('target'));

  if (grunt.option('target') === 'dev') {
    // Test (using Schematic Ipsum)
    return {
      "bitbucket": {
        "src": {
          "url": "http://schematic-ipsum.herokuapp.com/",
          "method": "POST",
          "body": {
              "type": "object",
              "properties": {
                "scm": {"type":"string", "enum":["git", "svn"] },
                "has_wiki": {"type": "boolean" },
                "last_updated": {"type": "string", "format": "date-time" },
                "no_forks": {"type": "string", "enum": [null, "test"] },
                "created_on": {"type": "string", "format": "date-time" },
                "owner": {"type": "string", "ipsum": "word" },
                "logo": {"type": "string", "ipsum": "small image" },
                "email_mailinglist": {"type": "string", "enum": ["", "test"] },
                "is_mq": {"type": "boolean" },
                "size": {"type": "integer" },
                "read_only": {"type": "boolean" },
                "fork_of": {"type": "string", "enum": [null, "test"] },
                "mq_of": {"type": "string", "enum": [null, "test"] },
                "state": {"type": "string", "enum": ["creating", "created"] },
                "utc_created_on": {"type": "string", "format": "date-time" },
                "website": {"type": "string", "enum": ["","test"] },
                "description": {"type": "string", "enum": ["","test"] },
                "has_issues": {"type": "boolean" },
                "is_fork": {"type": "boolean" },
                "slug": {"type": "string", "ipsum": "id" },
                "is_private": {"type": "boolean" },
                "name": {"type": "string", "ipsum": "sentence" },
                "language": {"type": "string", "enum": ["","test"] },
                "utc_last_updated": {"type": "string", "format": "date-time" },
                "email_writers": {"type": "boolean" },
                "no_public_forks": {"type": "boolean" },
                "creator": {"type": "string", "enum": [null,"test"] },
                "resource_uri": {"type": "string", "format": "uri" }
              }
            },
          "json": true
        },
        "dest": "./log/bb-response.json"
      }
    };
  } else {
    return {
      "bitbucket": {
        "src": {
          "url": "https://api.bitbucket.org/2.0/repositories/epiphanydevelopers/<%= pkg.client.string %>-<%= pkg.project.string %>",
          "method": "POST",
          "body": {
            "name": "<%= pkg.client.name %> - <%= pkg.project.name %>",
            "is_private": true,
            "scm": "git"
          },
          "json": true,
          "auth": {
            "username": "<%= secret.bitbucket.username %>",
            "password": "<%= secret.bitbucket.password %>",
            "sendImmediately": true
          }
        },
        "dest": "./log/bb-response.json"
      }
    };
  }
};