#!/bin/bash

# Base path
BASE_PATH="app/(site)"

# Create base user directory
mkdir -p "$BASE_PATH/user"
touch "$BASE_PATH/platform/page.tsx"

# Create dashboard
mkdir -p "$BASE_PATH/platform/dashboard"
touch "$BASE_PATH/platform/dashboard/page.tsx"

# Create account page
mkdir -p "$BASE_PATH/platform/account"
touch "$BASE_PATH/platform/account/page.tsx"

# Property Infrastructure
mkdir -p "$BASE_PATH/platform/properties"
touch "$BASE_PATH/platform/properties/page.tsx"
mkdir -p "$BASE_PATH/platform/properties/buildings"
touch "$BASE_PATH/platform/properties/buildings/page.tsx"
mkdir -p "$BASE_PATH/platform/properties/zones"
touch "$BASE_PATH/platform/properties/zones/page.tsx"
mkdir -p "$BASE_PATH/platform/properties/cameras"
touch "$BASE_PATH/platform/properties/cameras/page.tsx"

# Live Monitoring
mkdir -p "$BASE_PATH/platform/monitoring/live"
touch "$BASE_PATH/platform/monitoring/live/page.tsx"
mkdir -p "$BASE_PATH/platform/monitoring/recordings"
touch "$BASE_PATH/platform/monitoring/recordings/page.tsx"
mkdir -p "$BASE_PATH/platform/monitoring/wall"
touch "$BASE_PATH/platform/monitoring/wall/page.tsx"
mkdir -p "$BASE_PATH/platform/monitoring/ptz"
touch "$BASE_PATH/platform/monitoring/ptz/page.tsx"

# Analytics
mkdir -p "$BASE_PATH/platform/analytics/people"
touch "$BASE_PATH/platform/analytics/people/page.tsx"
mkdir -p "$BASE_PATH/platform/analytics/heatmaps"
touch "$BASE_PATH/platform/analytics/heatmaps/page.tsx"
mkdir -p "$BASE_PATH/platform/analytics/demographics"
touch "$BASE_PATH/platform/analytics/demographics/page.tsx"
mkdir -p "$BASE_PATH/platform/analytics/parking"
touch "$BASE_PATH/platform/analytics/parking/page.tsx"
mkdir -p "$BASE_PATH/platform/analytics/plates"
touch "$BASE_PATH/platform/analytics/plates/page.tsx"

# Security
mkdir -p "$BASE_PATH/platform/security/access"
touch "$BASE_PATH/platform/security/access/page.tsx"
mkdir -p "$BASE_PATH/platform/security/visitors"
touch "$BASE_PATH/platform/security/visitors/page.tsx"
mkdir -p "$BASE_PATH/platform/security/alerts"
touch "$BASE_PATH/platform/security/alerts/page.tsx"
mkdir -p "$BASE_PATH/platform/security/incidents"
touch "$BASE_PATH/platform/security/incidents/page.tsx"

# Staff
mkdir -p "$BASE_PATH/platform/staff"
touch "$BASE_PATH/platform/staff/page.tsx"
mkdir -p "$BASE_PATH/platform/staff/permissions"
touch "$BASE_PATH/platform/staff/permissions/page.tsx"

# Settings
mkdir -p "$BASE_PATH/platform/settings/profile"
touch "$BASE_PATH/platform/settings/profile/page.tsx"
mkdir -p "$BASE_PATH/platform/settings/notifications"
touch "$BASE_PATH/platform/settings/notifications/page.tsx"
mkdir -p "$BASE_PATH/platform/settings/reports"
touch "$BASE_PATH/platform/settings/reports/page.tsx"
mkdir -p "$BASE_PATH/platform/settings/billing"
touch "$BASE_PATH/platform/settings/billing/page.tsx"
