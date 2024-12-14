#!/bin/bash

# Base path
BASE_PATH="app/(site)"

# Create base user directory
mkdir -p "$BASE_PATH/user"
touch "$BASE_PATH/user/page.tsx"

# Create dashboard
mkdir -p "$BASE_PATH/user/dashboard"
touch "$BASE_PATH/user/dashboard/page.tsx"

# Create account page
mkdir -p "$BASE_PATH/user/account"
touch "$BASE_PATH/user/account/page.tsx"

# Property Infrastructure
mkdir -p "$BASE_PATH/user/properties"
touch "$BASE_PATH/user/properties/page.tsx"
mkdir -p "$BASE_PATH/user/properties/buildings"
touch "$BASE_PATH/user/properties/buildings/page.tsx"
mkdir -p "$BASE_PATH/user/properties/zones"
touch "$BASE_PATH/user/properties/zones/page.tsx"
mkdir -p "$BASE_PATH/user/properties/cameras"
touch "$BASE_PATH/user/properties/cameras/page.tsx"

# Live Monitoring
mkdir -p "$BASE_PATH/user/monitoring/live"
touch "$BASE_PATH/user/monitoring/live/page.tsx"
mkdir -p "$BASE_PATH/user/monitoring/recordings"
touch "$BASE_PATH/user/monitoring/recordings/page.tsx"
mkdir -p "$BASE_PATH/user/monitoring/wall"
touch "$BASE_PATH/user/monitoring/wall/page.tsx"
mkdir -p "$BASE_PATH/user/monitoring/ptz"
touch "$BASE_PATH/user/monitoring/ptz/page.tsx"

# Analytics
mkdir -p "$BASE_PATH/user/analytics/people"
touch "$BASE_PATH/user/analytics/people/page.tsx"
mkdir -p "$BASE_PATH/user/analytics/heatmaps"
touch "$BASE_PATH/user/analytics/heatmaps/page.tsx"
mkdir -p "$BASE_PATH/user/analytics/demographics"
touch "$BASE_PATH/user/analytics/demographics/page.tsx"
mkdir -p "$BASE_PATH/user/analytics/parking"
touch "$BASE_PATH/user/analytics/parking/page.tsx"
mkdir -p "$BASE_PATH/user/analytics/plates"
touch "$BASE_PATH/user/analytics/plates/page.tsx"

# Security
mkdir -p "$BASE_PATH/user/security/access"
touch "$BASE_PATH/user/security/access/page.tsx"
mkdir -p "$BASE_PATH/user/security/visitors"
touch "$BASE_PATH/user/security/visitors/page.tsx"
mkdir -p "$BASE_PATH/user/security/alerts"
touch "$BASE_PATH/user/security/alerts/page.tsx"
mkdir -p "$BASE_PATH/user/security/incidents"
touch "$BASE_PATH/user/security/incidents/page.tsx"

# Staff
mkdir -p "$BASE_PATH/user/staff"
touch "$BASE_PATH/user/staff/page.tsx"
mkdir -p "$BASE_PATH/user/staff/permissions"
touch "$BASE_PATH/user/staff/permissions/page.tsx"

# Settings
mkdir -p "$BASE_PATH/user/settings/profile"
touch "$BASE_PATH/user/settings/profile/page.tsx"
mkdir -p "$BASE_PATH/user/settings/notifications"
touch "$BASE_PATH/user/settings/notifications/page.tsx"
mkdir -p "$BASE_PATH/user/settings/reports"
touch "$BASE_PATH/user/settings/reports/page.tsx"
mkdir -p "$BASE_PATH/user/settings/billing"
touch "$BASE_PATH/user/settings/billing/page.tsx"
