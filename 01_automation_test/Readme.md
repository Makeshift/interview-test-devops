# Simple Nginx container

I decided against baking the static content directly into the container. Although it's more secure not giving the container access to the hosts filesystem, being able to edit the content without rebuilding the container is nice.

It would have made for a more interesting compose file though, I admit.

### Usage

Run `vagrant up`, navigate to http://localhost:8080/.