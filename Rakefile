require "rubygems"
require "tmpdir"
require 'fileutils'
require "pry"

GITHUB_REPONAME = "6artisans/6artisans-web"
LOCALES = %w{en}

def commit_pages directory, repository
  Dir.chdir directory

  system "git init"
  system "git add ."

  message = "Site updated at #{Time.now.utc}"

  system "git commit -m #{message.inspect}"
  system "git remote add origin git@github.com:#{repository}.git"
  system "git push origin master:refs/heads/gh-pages --force"
end

namespace :site do
  desc "Generate and publish"
  task :publish do
    Dir.mktmpdir do |tmp_root|
      system "bundle exec middleman build"

      cp_r "build/.", tmp_root

      rm_rf "build"

      LOCALES.each do |locale|
        Dir.mktmpdir do |tmp_locale|
          # Duplicate whole content
          cp_r File.join(tmp_root, "."), tmp_locale

          # Overwrite locale files into root
          FileUtils.mv(
            Dir.glob(File.join(tmp_locale, locale, "*")),
            "#{tmp_locale}/",
            # noop: true,
            verbose: true
          )

          FileUtils.remove_dir(File.join(tmp_locale, locale))

          commit_pages tmp_locale, "#{GITHUB_REPONAME}-#{locale}"
        end
      end

      commit_pages tmp_root, GITHUB_REPONAME
    end
  end
end

task default: "site:publish"
