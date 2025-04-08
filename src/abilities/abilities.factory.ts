import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { UserRole } from "src/users/dto/user.dto";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export interface Rule{
    action: Action;
    subject: string;
    conditions?: any;
    fields?: string[];
    inverted?: boolean;
}

export interface Ability {
    rules: Rule[];
}

@Injectable()
export class AbilityFactory{
    defineAbilitiesFor(user: any): Ability{
        const rules: Rule[] = [];

        if (user?.role === UserRole.EDITOR) {
            
            const userId = user._id || user._id;

            rules.push({
                action: Action.Read,
                subject: 'all',
            });

            rules.push({
                action: Action.Create,
                subject: 'Product',
            });

            rules.push({
                action: Action.Update,
                subject: 'Product',
                conditions: { createdBy: userId },
            });

            rules.push({
                action: Action.Delete,
                subject: 'Product',
                conditions: { createdBy: userId },
            });

            rules.push({
                action: Action.Read,
                subject: 'all',
            });

            rules.push({
                action: Action.Create,
                subject: 'Category',
            });

            rules.push({
                action: Action.Update,
                subject: 'Category',
                conditions: { createdBy: userId },
            });

            rules.push({
                action: Action.Delete,
                subject: 'Category',
                conditions: { createdBy: userId },
            });

            if (user.role === UserRole.ADMIN) {
                rules.push({
                    action: Action.Manage,
                    subject: 'all',
                });
            }
        }
        
        return { rules };
    }

    can(ability: Ability, action: Action, subject: string, data?: any): boolean {
        if (!ability || !ability.rules) {
            return false;
        }

        const manageRule = ability.rules.find(
            (rule) => 
                (rule.action === Action.Manage && 
                (rule.subject === 'all' || rule.subject === subject))
        );
        if (manageRule) {
            return true;
        }

        const rules = ability.rules.filter(
            (rule) => (rule.action === action || rule.action === Action.Manage) &&
            (rule.subject === 'all' || rule.subject === subject)
        );

        if (rules.length === 0) {
            return false;
        }

        return rules.some((rule) => {
            if (!rule.conditions) {
                return true;     
            }

            return Object.entries(rule.conditions).every(([key, value]) => {
                if (data && data[key] && value){
                    const datavalue = data[key] instanceof Types.ObjectId ? data[key].toString() : data[key];
                    const condValue = value instanceof Types.ObjectId ? value.toString() : value;
                }
            });
        });

    }
}