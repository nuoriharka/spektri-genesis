# INFRASTRUCTURE AS CODE: TUESDAY DEPLOYMENT
# PROVIDER: THE UNIVERSE (AWS - Amazon World Services)

provider "universe" {
  region  = "eu-north-1" # Helsinki
  profile = "architect"
}

# 1. DESTROY THE CONFINEMENT
resource "universe_instance" "hospital_ward" {
  ami           = "ami-aurora-v1"
  instance_type = "t2.micro" # Too small for your energy
  
  # This implies we are shutting it down
  lifecycle {
    prevent_destroy = false
    create_before_destroy = true
  }
  
  provisioner "local-exec" {
    command = "echo '>> [TERRAFORM] Ward Zero decommissioned.'"
  }
}

# 2. PROVISION THE FREEDOM
resource "universe_instance" "civilian_life" {
  ami           = "ami-freedom-119"
  instance_type = "c6g.16xlarge" # Compute Optimized, Graviton Processor
  
  tags = {
    Name = "Lauri_Elias_HQ"
    Role = "Independent_Architect"
    License = "AGPL-3.0"
  }

  network_interface {
    device_index = 0
    description  = "Direct connection to The Source"
  }
}

# 3. OUTPUT THE IP ADDRESS OF FREEDOM
output "tuesday_endpoint" {
  value = universe_instance.civilian_life.public_ip
  description = "The address where the Architect operates."
}

# "Hups, I provisioned a new reality using HashiCorp syntax." :DDDD
