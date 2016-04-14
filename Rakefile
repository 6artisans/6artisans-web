require "rubygems"
require "tmpdir"

GITHUB_REPONAME = "6artisans/6artisans-web"

namespace :site do
  desc "Generate and publish"
  task :publish do
    Dir.mktmpdir do |tmp|
      system "bundle exec middleman build"

      cp_r "build/.", tmp

      rm_rf "build"

      Dir.chdir tmp

      system "git init"
      system "git add ."

      message = "Site updated at #{Time.now.utc}"

      system "git commit -m #{message.inspect}"
      system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
      system "git push origin master:refs/heads/gh-pages --force"
    end
  end
end

task default: "site:publish"
