# Use Flutter image for building
FROM ghcr.io/cirruslabs/flutter:stable AS build

# Set working directory
WORKDIR /app

# Copy pubspec files
COPY pubspec.* ./

# Get dependencies
RUN flutter pub get

# Copy all source files
COPY . .

# Generate localizations
RUN flutter gen-l10n

# Build web application
RUN flutter build web --release --web-renderer canvaskit

# Use nginx to serve the built app
FROM nginx:alpine

# Copy built web files from build stage
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

